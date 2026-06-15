import requests
from google.transit import gtfs_realtime_pb2
from datetime import datetime
import time
import json  # For pretty errors

# Config
API_KEY = 'YOUR_KEY_HERE'
GTFS_BASE = 'https://api.at.govt.nz/gtfs/stops'  # Adjust if needed (v3?)
REALTIME_URL = 'https://api.at.govt.nz/v2/public/realtime/tripupdates'  # protobuf trip updates
STOP_NAME_SEARCH = 'Waitemata'  # Or 'Britomart Station'

HEADERS = {
    'Ocp-Apim-Subscription-Key': API_KEY,
    'Accept': 'application/json'  # For GTFS stops
}
PB_HEADERS = {  # For realtime protobuf
    'Ocp-Apim-Subscription-Key': API_KEY,
    'Accept': 'application/x-google-protobuf'
}

def find_stop_id_by_name(name):
    params = {'search': name}
    resp = requests.get(GTFS_BASE, headers=HEADERS, params=params)
    if resp.status_code != 200:
        print(f"Stops lookup failed: {resp.status_code} - {resp.text}")
        return None
    
    data = resp.json()
    if 'data' in data and data['data']:
        first_match = data['data'][0]
        stop_id = first_match['id']
        stop_name = first_match.get('attributes', {}).get('stop_name', 'Unknown')
        print(f"Found stop: {stop_name} (ID: {stop_id})")
        return stop_id
    print("No matches found—check name or try 'Britomart'")
    return None

def get_departures(stop_id):
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
            for stu in entity.trip_update.stop_time_update:
                if stu.stop_id == stop_id and stu.HasField('departure'):
                    dep_time = datetime.fromtimestamp(stu.departure.time)
                    if dep_time > now:
                        delay = stu.departure.delay
                        headsign = trip.trip_headsign or 'N/A'
                        route = trip.route_id
                        deps.append({
                            'route': route,
                            'headsign': headsign,
                            'time': dep_time,
                            'delay': delay
                        })
    
    deps.sort(key=lambda x: x['time'])
    return deps[:8]  # Top 8 upcoming

def print_board(deps):
    print(f"\n=== Departure Board: {STOP_NAME_SEARCH} ({datetime.now().strftime('%H:%M')}) ===")
    print("Route | Headsign          | Departs | Status")
    print("------|-------------------|---------|--------")
    for d in deps:
        t_str = d['time'].strftime('%H:%M')
        mins = d['delay'] // 60
        status = f"{mins} min late" if mins > 0 else f"{-mins} min early" if mins < 0 else "On time"
        print(f"{d['route']:<6}| {d['headsign'][:17]:<17} | {t_str:<7} | {status}")

# Run once (or loop)
stop_id = find_stop_id_by_name(STOP_NAME_SEARCH)
if stop_id:
    deps = get_departures(stop_id)
    print_board(deps)
else:
    print("Couldn't find stop—check API response or key.")

# For live board: wrap in while True: ... time.sleep(60)