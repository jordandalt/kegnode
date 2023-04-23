# KegNode Application

A containerized application for real-time monitoring and reporting of my home bar (The Lorraine Street Garage) usage.

## KegNode-Board

Node application to read from the Arduino's serial output and POST pour volumes to `Tap` server endpoint. Think carefully about how to handle simultaneous pours (we're reading from serial here, so we're really talking about *near*-simultaneity). Flow monitor to tap assignment is handled in the config, as is flow rate calibration.

## KegNode-Server

Express server providing endpoints for:
- Create/Update keg
- Assign keg to tap
- Record pour for tap
- Getting tap status (current keg, current volume)

## KegNode-MySQL

Generic Mysql container to hold the data

## KegNode-Client

React application/frontend client for:
- Admin UI for keg CRUD
- Admin UI for tap updates
- UI for tap status (let's use sockets.io for near-real-time-updates)
- for funzies, dataviz on keg/beer consumption patterns