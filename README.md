# RealTemp-ESP32

ESP32 real-time temperature, humidity, and multi-light control project. The ESP32 reads a DHT11 sensor, syncs data with Firebase Realtime Database, and can be controlled from a React Native/Expo mobile app.

## Features

- ESP32 reads temperature and humidity from DHT11.
- Realtime Firebase data sync.
- Multi-light control from Firebase/mobile app.
- Expo mobile app for monitoring and control.
- Demo video and hardware setup documentation.

## Tech Stack

- ESP32
- Arduino IDE or PlatformIO
- DHT11 sensor
- Firebase Realtime Database
- Expo
- React Native
- TypeScript

## Hardware Requirements

| Component | Quantity | Notes |
| --- | ---: | --- |
| ESP32 Dev Board | 1 | Any common ESP32 development board |
| DHT11 Sensor | 1 | Temperature and humidity sensor |
| LEDs | 3 | Connected to GPIO pins |
| Jumper wires | As needed | For wiring |
| Breadboard | 1 | Optional |

## Wiring

| ESP32 Pin | Component |
| --- | --- |
| GPIO4 | DHT11 data |
| GPIO2 | LED 1 |
| GPIO15 | LED 2 |
| GPIO5 | LED 3 |
| GND | Common ground |

Adjust GPIO pins in the sketch if your wiring is different.

## Project Structure

```text
ESP32/sketch_may14a/       Arduino sketch for ESP32
App/dht11-app/             Expo mobile app
```

## Firmware Setup

1. Install ESP32 board support in Arduino IDE or PlatformIO.
2. Install required libraries:
   - Firebase ESP Client
   - DHT sensor library
   - WiFi library for ESP32
3. Configure Wi-Fi and Firebase credentials in the sketch.
4. Upload the sketch to the ESP32.

## Mobile App Setup

```bash
cd App/dht11-app
npm install
npm start
```

Run on a target platform:

```bash
npm run android
npm run ios
npm run web
```

## Demo

- Demo video: https://youtu.be/XzEVSjrkoaY
- Demo app download: https://drive.google.com/file/d/1YZ6uRNtUzphLIVL4PBOrauZwbSCO0E0m/view

## Security Note

Do not use open Firebase rules in production. Use authenticated access and restrict read/write permissions before deploying outside a test environment.
