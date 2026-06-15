#!/usr/bin/env python3
"""
Auckland Transport Real-Time Departure Board Master Controller
For Raspberry Pi Display Systems
By Doc Brown's Temporal Transit Laboratory
"""
import requests
from google.transit import gtfs_realtime_pb2
from datetime import datetime, timedelta
import time
import os
from typing import List, Dict
from enum import Enum
import random  # For simulation mode

# ============================================================================
# CONFIGURATION - CRITICAL! SET YOUR API KEY!
# ============================================================================
API_KEY = 'YOUR_KEY_HERE'  # Get from dev-portal.at.govt.nz
SIMULATION_MODE = API_KEY == 'YOUR_KEY_HERE'  # Auto-simulate if no key
# API Endpoints (updated to v3 for GTFS per dev portal)
GTFS_BASE = 'https://api.at.govt.nz/gtfs/v3/stops'
REALTIME_URL = 'https://api.at.govt.nz/v2/public/realtime/tripupdates'
# Display Configuration
ROTATION_SECONDS = 45  # Time to show each board before rotating
MAX_DEPARTURES = 10  # Maximum departures to show per board
REFRESH_INTERVAL = 30  # Seconds between API updates
# ANSI colors for punk vibe
COLOR_GREEN = '\033[92m'
COLOR_RED = '\033[91m'
COLOR_YELLOW = '\033[93m'
COLOR_RESET = '\033[0m'
# ============================================================================
# TRANSIT MODE DEFINITIONS
# ============================================================================
class TransitMode(Enum):
    TRAIN = "train"
    BUS = "bus"
    FERRY = "ferry"
class Location:
    """Configuration for each departure board location"""
    def __init__(self, name: str, search_term: str, mode: TransitMode,
                 route_prefixes: List[str] = None):
        self.name = name
        self.search_term = search_term
        self.mode = mode
        self.route_prefixes = route_prefixes or []
        self.stop_ids = []
# Define your three locations
LOCATIONS = [
    Location(
        name="Waitemata Station",
        search_term="Waitemata",
        mode=TransitMode.TRAIN,
        route_prefixes=[]  # Train routes - usually Eastern, Southern, Western, Onehunga lines
    ),
    Location(
        name="Britomart Bus Hub",
        search_term="Britomart",
        mode=TransitMode.BUS,
        route_prefixes=['64-', '65-', '66-', '67-', '68-', '18-', '20-', '22-',
                       '24-', '25-', '27-', '30-', '70-', '75-', '295-', '298-',
                       '309-', '321-', '744-', '747-', '751-', '755-', '781-', '782-']
    ),
    Location(
        name="Downtown Ferry Terminal",
        search_term="Downtown Ferry",
        mode=TransitMode.FERRY,
        route_prefixes=['BAYS-', 'BIRK-', 'KPHS-', 'KPHM-', 'PINE-', 'RAK-',
                       'RANG-', 'TIRI-', 'WSTH-', 'MTIA-', 'HMB-']
    )
]
# ============================================================================
# API INTERACTION
# ============================================================================
HEADERS = {
    'Ocp-Apim-Subscription-Key': API_KEY,
    'Accept': 'application/json'
}
PB_HEADERS = {
    'Ocp-Apim-Subscription-Key': API_KEY,
    'Accept': 'application/x-google-protobuf'
}
def find_stop_ids(location: Location) -> List[str]:
    """Find all stop IDs for a given location"""
    if SIMULATION_MODE:
        print(f"🎭 Simulation: Mocking 3 stops for {location.name}")
        return [f"mock_{i}" for i in range(3)]
    
    params = {'search': location.search_term}
    try:
        resp = requests.get(GTFS_BASE, headers=HEADERS, params=params, timeout=10)
        if resp.status_code != 200:
            print(f"⚠️ Stop lookup failed for {location.name}: {resp.status_code}")
            return []
        
        data = resp.json()
        stop_ids = []
        if 'data' in data:
            for item in data['data']:
                attrs = item.get('attributes', {})
                # Location type 0 = platform/child stop
                if attrs.get('location_type') == 0:
                    stop_ids.append(item['id'])
                    print(f"✓ Found: {attrs.get('stop_name')} (ID: {item['id']})")
        
        return stop_ids
    except Exception as e:
        print(f"❌ Error finding stops for {location.name}: {e}")
        return []
def get_departures(location: Location) -> List[Dict]:
    """Fetch real-time departures for a location"""
    if SIMULATION_MODE:
        print(f"🎭 Simulating departures for {location.name}")
        now = datetime.now()
        mock_deps = []
        for i in range(MAX_DEPARTURES):
            dep_time = now + timedelta(minutes=random.randint(1, 60))
            mock_deps.append({
                'route': random.choice(location.route_prefixes) if location.route_prefixes else 'MOCK',
                'headsign': random.choice(['Glen Innes', 'Newmarket', 'Onehunga', 'Devonport', 'Waiheke']),
                'time': dep_time,
                'mins_until': random.randint(1, 60),
                'delay': random.randint(-120, 300),  # Seconds
                'stop_id': 'mock'
            })
        return mock_deps
    
    try:
        resp = requests.get(REALTIME_URL, headers=PB_HEADERS, timeout=10)
        if resp.status_code != 200:
            print(f"⚠️ Realtime feed failed: {resp.status_code}")
            return []
        
        feed = gtfs_realtime_pb2.FeedMessage()
        feed.ParseFromString(resp.content)
        
        now = datetime.now()
        deps = []
        
        for entity in feed.entity:
            if entity.HasField('trip_update'):
                trip = entity.trip_update.trip
                route_id = trip.route_id
                
                # Filter by route prefixes if specified
                if location.route_prefixes:
                    if not any(route_id.startswith(p) for p in location.route_prefixes):
                        continue
                
                for stu in entity.trip_update.stop_time_update:
                    if stu.stop_id in location.stop_ids and stu.HasField('departure'):
                        dep_time = datetime.fromtimestamp(stu.departure.time)
                        
                        # Only future departures
                        if dep_time > now:
                            delay = stu.departure.delay if stu.departure.HasField('delay') else 0
                            headsign = trip.trip_headsign or 'N/A'
                            
                            # Calculate minutes until departure
                            mins_until = int((dep_time - now).total_seconds() / 60)
                            if mins_until < 0: mins_until = 0  # Safety
                            
                            deps.append({
                                'route': route_id,
                                'headsign': headsign,
                                'time': dep_time,
                                'mins_until': mins_until,
                                'delay': delay,
                                'stop_id': stu.stop_id
                            })
        
        # Sort by departure time and limit results
        deps.sort(key=lambda x: x['time'])
        return deps[:MAX_DEPARTURES]
        
    except Exception as e:
        print(f"❌ Error fetching departures for {location.name}: {e}")
        return []
# ============================================================================
# DISPLAY RENDERING
# ============================================================================
def get_mode_icon(mode: TransitMode) -> str:
    """Get emoji icon for transit mode"""
    icons = {
        TransitMode.TRAIN: "🚆",
        TransitMode.BUS: "🚌",
        TransitMode.FERRY: "⛴️"
    }
    return icons.get(mode, "🚏")
def clear_screen():
    """Clear terminal screen"""
    os.system('clear' if os.name != 'nt' else 'cls')
def render_console_board(location: Location, departures: List[Dict]):
    """Render departure board to console/terminal"""
    clear_screen()
    
    # Header
    icon = get_mode_icon(location.mode)
    current_time = datetime.now().strftime('%H:%M:%S')
    
    print("╔" + "═" * 78 + "╗")
    print(f"║ {icon} AUCKLAND TRANSPORT - REAL-TIME DEPARTURES{' ' * 30}║")
    print(f"║ {location.name:<50} {current_time:>25} ║")
    print("╠" + "═" * 78 + "╣")
    print("║ Route │ Destination │ Departs │ In │ Status ║")
    print("╠" + "═" * 78 + "╣")
    
    # Departures
    if not departures:
        print("║" + " " * 25 + "No departures found" + " " * 34 + "║")
    else:
        for dep in departures:
            route = dep['route'][:7]
            headsign = dep['headsign'][:22]
            time_str = dep['time'].strftime('%H:%M')
            mins = dep['mins_until']
            
            # Format minutes
            if mins == 0:
                mins_str = "NOW"
            elif mins < 60:
                mins_str = f"{mins}m"
            else:
                hrs = mins // 60
                m = mins % 60
                mins_str = f"{hrs}h{m}m"
            
            # Status with color
            delay_mins = dep['delay'] // 60
            if delay_mins > 2:
                status = f"{COLOR_RED}{delay_mins}m LATE{COLOR_RESET}"
                marker = "⚠️"
            elif delay_mins < -2:
                status = f"{COLOR_YELLOW}{-delay_mins}m EARLY{COLOR_RESET}"
                marker = "⚡"
            else:
                status = f"{COLOR_GREEN}ON TIME{COLOR_RESET}"
                marker = "✓"
            
            print(f"║ {route:<7}│ {headsign:<22}│ {time_str:<8}│ {mins_str:<5}│ {marker} {status:<10} ║")
    
    print("╚" + "═" * 78 + "╝")
    print(f"\nRefreshing in {REFRESH_INTERVAL}s | Rotating boards every {ROTATION_SECONDS}s")
# ============================================================================
# MAIN CONTROL LOOP
# ============================================================================
def initialize_locations():
    """Find stop IDs for all locations on startup"""
    print("🚀 INITIALIZING DEPARTURE BOARD SYSTEM...")
    print("=" * 80)
    
    for location in LOCATIONS:
        print(f"\n📍 Searching for {location.name}...")
        stop_ids = find_stop_ids(location)
        location.stop_ids = stop_ids
        
        if not stop_ids:
            print(f"⚠️ WARNING: No stops found for {location.name}")
        else:
            print(f"✓ Found {len(stop_ids)} stop(s) for {location.name}")
    
    print("\n" + "=" * 80)
    print("✓ INITIALIZATION COMPLETE\n")
    time.sleep(2)
def main():
    """Main control loop - rotates through locations"""
    
    if SIMULATION_MODE:
        print("🎭 RUNNING IN SIMULATION MODE (No API key set)")
    
    # Initialize all locations
    initialize_locations()
    
    # Check if any locations were found
    valid_locations = [loc for loc in LOCATIONS if loc.stop_ids]
    if not valid_locations:
        print("❌ ERROR: No valid locations found. Check your API key and network connection.")
        return
    
    print("🎬 STARTING LIVE DEPARTURE BOARD...")
    print(" Press Ctrl+C to exit\n")
    time.sleep(2)
    
    # Main loop
    location_index =