## Node application for reading from Arduino and flow meters and POSTing to server endpoint

Classes:
- Board -- parent script, handles serial communication, input parsing, and `/Tap` endpoint updates. contains:
    - collection of FlowMonitors
    - collection of Pours
    - current timestamp
    - method to:
        1. take serial input
        2. parse out monitor identity
        3. iterate monitor tick count
- FlowMonitor -- represents single tap sensor. contains:
    - identity
    - tap identity
    - current tick count (0 if idle)
    - last tick timestamp
    - ticks to ml calibration value
    - status: active / idle
- Pour -- represents a historic pour. contains:
    - tap identity
    - start and end timestamps
    - total volume
