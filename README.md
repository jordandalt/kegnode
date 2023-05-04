# KegNode Application

A full-stack Javascript application for real-time monitoring and reporting of my home bar, The Lorraine Street Garage.

### To Do for Everything:
- [ ] Containerize with Docker and Docker compose
- [ ] Write unit tests and integration tests
- [ ] Authentication/security for API endpoints
- [ ] Prod env setup
- [ ] Scripting installation/setup
 
## KegNode-Board

Node application to read from RPIO and POST pour volumes to `Tap` server endpoint. Think carefully about how to handle simultaneous pours (we're reading from serial here, so we're really talking about *near*-simultaneity). Flow monitor to tap assignment is handled in the config, as is flow rate calibration.

To begin, run: `npm start`

### To Do for Board:
- [ ] Replace POST request with websocket connection?

## KegNode-Server

Express server providing endpoints for:
- Keg management
- Tapping kegs
- Recording pours
- Getting tap statuses

To begin, run: `npm run dev`

### To Do for Server:
- [ ] Make keg deletion soft instead of hard
- [ ] Review error handling and responses
- [ ] Tweak data structure and implement endpoint for "last keg kicked"
 
## KegNode-Client

React application/frontend client for:
- Keg administration
- Tap status listing

To begin, run: `npm start`

### To Do for Client:
- [ ] Replace polling for tap listing with websocket listener
- [ ] Display "kicked on" date for keg admin, but only allow kegs with a current volume > 0 and no kicked on date to be assigned to a tap.
- [ ] Implement "last keg kicked"
- [ ] Consumption data visualizations
- [ ] Untappd integration -- register LSG as drinking spot and display check-ins
