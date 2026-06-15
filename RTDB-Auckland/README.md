# Auckland Transport Real-Time Departure Board Master Controller
**By Doc Brown's Temporal Transit Laboratory**  
Raspberry Pi-powered rotating live departure boards for Waitemata Station (trains), Britomart Bus Hub, and Downtown Ferry Terminal.

Pulls live data from Auckland Transport's GTFS-Realtime API, rotates every 45 seconds, refreshes every 30 seconds.  
Runs in simulation mode if no API key is set—perfect for testing without burning through quota.

## Features
- Three rotating boards: Trains @ Waitemata, Buses @ Britomart, Ferries @ Downtown
- Route filtering per mode (buses/ferries use prefix lists from GTFS)
- Console display with emoji icons, delay status (green/on-time, red/late, yellow/early)
- Auto-finds stop IDs via GTFS API search
- Simulation mode mocks realistic departures when no key is provided
- ANSI color output for that extra 80s arcade vibe

## How to Rock This on Your Pi

### 1. Setup
- SSH into your Raspberry Pi
- Save the script as `departure_board.py`
- Make it executable:  
  ```bash
  chmod +x departure_board.py