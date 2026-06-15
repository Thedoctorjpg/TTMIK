import requests
from google.transit import gtfs_realtime_pb2
from datetime import datetime
import time
import json  # For pretty errors

# Config
API_KEY = 'YOUR_KEY_HERE'  # From dev-portal.at.govt.nz (GTFS + Realtime APIs)
GTFS_BASE = 'https://api.at.govt.nz/gtfs/stops'  # Adjust if v3 or other
REALTIME_URL = 'https://api.at.govt.nz/v2/public/realtime/tripupdates'
SEARCH_TERM = 'Downtown Ferry'  # Grabs Downtown Ferry Terminal piers/stops

HEADERS = {
    'Ocp-Apim-Subscription-Key': API_KEY,
    'Accept': 'application/json'
}
PB_HEADERS = {
    'Ocp-Apim-Subscription-Key': API_KEY,
    'Accept': 'application/x-google-protobuf'
}

# Known ferry route_id prefixes (from GTFS routes.txt - add more if needed)
FERRY_ROUTE_PREFIXES = ['BAYS-', 'BIRK-', 'KPHS-', 'KPHM-', 'PINE-', 'RAK-', 'RANG-', 'TIRI-', 'WSTH-', 'MTIA-', 'HMB-']  # e.g., Bayswater, Birkenhead, Pine, Rakino, Rangitoto, West Harbour, Waiheke, Half Moon Bay

def find_ferry_stop_ids(name):
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
            if attrs.get('location_type') == 0:  # Platforms/child stops
                stop_ids.append(item['id'])
                print(f"Found stop: {attrs.get('stop_name')} (ID: {item['id']})")
    if not stop_ids:
        print("No child stops found—try tweaking SEARCH_TERM or check portal.")
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
            # Filter for ferry routes
            if any(route_id.startswith(prefix) for prefix in FERRY_ROUTE_PREFIXES):
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
                                'stop_id': stu.stop_id  # For debug
                            })
    
    deps.sort(key=lambda x: x['time'])
    return deps[:15]  # Top 15 upcoming across all piers

def print_board(deps):
    print(f"\n=== Auckland Ferry Departure Board: Downtown Terminal ({datetime.now().strftime('%H:%M')}) ===")
    print("Route | Destination       | Departs | Status")
    print("------|-------------------|---------|--------")
    for d in deps:
        t_str = d['time'].strftime('%H:%M')
        mins = d['delay'] // 60
        status = f"{mins}m late" if mins > 0 else f"{-mins}m early" if mins < 0 else "On time"
        print(f"{d['route']:<6}| {d['headsign'][:17]:<17} | {t_str:<7} | {status}")

# Run (loop for live)
stop_ids = find_ferry_stop_ids(SEARCH_TERM)
if stop_ids:
    while True:
        deps = get_departures(stop_ids)
        print_board(deps)
        time.sleep(60)  # Refresh min
else:
    print("No stops found—sign up/subscribe on dev portal and check key/URL.")
