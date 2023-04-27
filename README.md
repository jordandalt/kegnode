# KegNode Application

A full-stack Javascript application for real-time monitoring and reporting of my home bar (The Lorraine Street Garage) usage.

## KegNode-Board

Node application to read from the Arduino's serial output and POST pour volumes to `Tap` server endpoint. Think carefully about how to handle simultaneous pours (we're reading from serial here, so we're really talking about *near*-simultaneity). Flow monitor to tap assignment is handled in the config, as is flow rate calibration.

To begin, run: `npm start`

## KegNode-Server

Express server providing endpoints for:
- Keg management
- Tapping kegs
- Recording pours
- Getting tap statuses

To begin, run: `npm run dev`

### To Do for Server:
- [ ] Review error handling and responses
- [ ] Write unit tests and integration tests
- [ ] Authentication/security for API endpoints
- [ ] Prod env setup

## KegNode-Client

React application/frontend client for:
- Admin UI for keg CRUD
- Admin UI for tap updates
- UI for tap status (let's use sockets.io for near-real-time-updates)
- for funzies, dataviz on keg/beer consumption patterns

To begin, run: `npm start`