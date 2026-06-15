import requests
from google.transit import gtfs_realtime_pb2
from datetime import datetime
import time
import json  # For pretty errors

# Config
API_KEY = 'YOUR_KEY_HERE'  # From dev-portal.at.govt.nz (GTFS + Realtime)
GTFS_BASE = 'https://api.at.govt.nz/gtfs/stops'  # Adjust if v3/other
REALTIME_URL = 'https://api.at.govt.nz/v2/public/realtime/tripupdates'
SEARCH_TERM = 'Britomart'  # Grabs Britomart bus stops (Lower Albert, etc.)

HEADERS = {
    'Ocp-Apim-Subscription-Key': API_KEY,
    'Accept': 'application/json'
}
PB_HEADERS = {
    'Ocp-Apim-Subscription-Key': API_KEY,
    'Accept': 'application/x-google-protobuf'
}

# Optional: Central bus route prefixes from PDFs/GTFS (uncomment to filter)
# BUS_ROUTE_PREFIXES = ['64-', '65-', '66-', '67-', '68-', '18-', '20-', '22-', '24-', '25-', '27-', '30-', '70-', '75-', '295-', '298-', '309-', '321-', '744-', '747-', '751-', '755-', '781-', '782-']  # Crosstown, Dominion, Manukau, Remuera, etc.

def find_bus_stop_ids(name):
    params = {'search': name}
    resp = requests.get(GTFS_BASE, headers=HEADERS, params=params)
    if resp.status_code != 200:
        print(f"Stops lookup failed: {resp.status_code} - {resp.text}")
        return []
    
    data = resp.json()
    stop_ids = []
    if 'data' in data:
        for item in data['data']:
            attrs = item.get('attributes', {})
            if attrs.get('location_type') == 0:  # Platforms/child stops (buses here)
                stop_ids.append(item['id'])
                print(f"Found stop: {attrs.get('stop_name')} (ID: {item['id']})")
    if not stop_ids:
        print("No stops found—try 'Lower Albert' or check portal.")
    return stop_ids

def get_departures(stop_ids):
    resp = requests.get(REALTIME_URL, headers=PB_HEADERS)
    if resp.status_code != 200:
        print(f"Realtime failed: {resp.status_code}")
        return []
    
    feed = gtfs_realtime_pb2.FeedMessage()
    feed.ParseFromString(resp.content)
    
    now = datetime.now()
    deps = []
    for entity in feed.entity:
        if entity.HasField('trip_update'):
            trip = entity.trip_update.trip
            route_id = trip.route_id
            # Optional filter: if BUS_ROUTE_PREFIXES: if any(route_id.startswith(p) for p in BUS_ROUTE_PREFIXES):
            for stu in entity.trip_update.stop_time_update:
                if stu.stop_id in stop_ids and stu.HasField('departure'):
                    dep_time = datetime.fromtimestamp(stu.departure.time)
                    if dep_time > now:
                        delay = stu.departure.delay
                        headsign = trip.trip_headsign or 'N/A'  # Destination
                        deps.append({
                            'route': route_id,
                            'headsign': headsign,
                            'time': dep_time,
                            'delay': delay,
                            'stop_id': stu.stop_id  # Debug
                        })
    
    deps.sort(key=lambda x: x['time'])
    return deps[:15]  # Top 15 upcoming

def print_board(deps):
    print(f"\n=== Central Bus Departure Board: Britomart Hub ({datetime.now().strftime('%H:%M')}) ===")
    print("Route | Destination       | Departs | Status")
    print("------|-------------------|---------|--------")
    for d in deps:
        t_str = d['time'].strftime('%H:%M')
        mins = d['delay'] // 60
        status = f"{mins}m late" if mins > 0 else f"{-mins}m early" if mins < 0 else "On time"
        print(f"{d['route']:<6}| {d['headsign'][:17]:<17} | {t_str:<7} | {status}")

# Run (loop for live)
stop_ids = find_bus_stop_ids(SEARCH_TERM)
if stop_ids:
    while True:
        deps = get_departures(stop_ids)
        print_board(deps)
        time.sleep(60)  # Refresh min
else:
    print("No stops—check key/URL or try SEARCH_TERM='Lower Albert'.")
