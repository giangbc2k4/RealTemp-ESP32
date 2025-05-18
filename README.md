---

# ESP32 Real-Time Temperature Monitoring & Multi-Light Control with Firebase

## Overview

This project uses an ESP32 microcontroller with a DHT11 sensor for temperature and humidity measurement, integrated with Firebase Realtime Database to enable remote real-time monitoring and multi-LED control. You can control LEDs and monitor sensor data remotely via Firebase or a connected React Native app.
👉 Demo app [React Native demo app](https://drive.google.com/file/d/1djeuhNQpajjrQPfgAFhJWZ38sCUako30/view?usp=sharing)  you can download and try it out.

---

## Hardware Requirements

| Component             | Quantity  | Notes                         |
| --------------------- | --------- | ----------------------------- |
| ESP32 Dev Board       | 1         | Any ESP32 development board   |
| DHT11 Sensor          | 1         | Temperature & humidity sensor |
| LEDs                  | 3         | Connected to GPIO pins        |
| Jumper Wires          | As needed | For wiring components         |
| Breadboard (optional) | 1         | For easy wiring               |

---

## Software Requirements

* Arduino IDE or PlatformIO
* ESP32 Board Support Installed
* Libraries:

  * [Firebase ESP Client](https://github.com/mobizt/Firebase-ESP-Client)
  * [DHT sensor library](https://github.com/adafruit/DHT-sensor-library)
  * [WiFi library for ESP32](https://github.com/espressif/arduino-esp32)

---

## Wiring Diagram

| ESP32 Pin | Component  | Description          |
| --------- | ---------- | -------------------- |
| GPIO4     | DHT11 Data | Data pin from sensor |
| GPIO2     | LED1       | LED 1                |
| GPIO15    | LED2       | LED 2                |
| GPIO5     | LED3       | LED 3                |
| GND       | All GND    | Common Ground        |

*Adjust GPIO pins in code if your wiring differs.*

---

## Setup Instructions

### 1. Firebase Setup

* Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
* Enable **Realtime Database** and configure rules (example rules for testing below):

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

* Enable Email/Password authentication in Authentication tab.
* Obtain your Firebase project **API key** and **Realtime Database URL**.

### 2. Configure Your ESP32 Code

Update these defines in your code:

```c
#define API_KEY "YOUR_FIREBASE_API_KEY"
#define DATABASE_URL "https://your-project-id.firebaseio.com/"
#define USER_EMAIL "your-email@example.com"
#define USER_PASSWORD "your-secure-password"
```

Set your WiFi credentials:

```c
#define WIFI_SSID "your_wifi_ssid"
#define WIFI_PASSWORD "your_wifi_password"
```

### 3. Upload Firmware

* Open your project in Arduino IDE or PlatformIO.
* Install required libraries if not already done.
* Upload the firmware to ESP32.
* Open Serial Monitor to check WiFi and Firebase connection status.

---

## Functional Description

* **Sensor Reading:** Periodic temperature and humidity readings from DHT11.
* **Firebase Sync:** Sensor data and LED control flags synced in Realtime Database.
* **LED Control Logic:**

  * If `all = false`: All LEDs are turned OFF.
  * If `all = true`:

    * LEDs 1 and 2 turn ON/OFF based on temperature if at least one of `led1` or `led2` is `true` in Firebase; otherwise OFF.
    * LED 3 state directly follows the `led3` flag from Firebase.

---

## Firebase Data Structure Example

```json
{
  "esp32": {
    "control": {
      "all": true,
      "led1": true,
      "led2": true,
      "led3": true
    },
    "humidity": 20,
    "temperature": 10
  }
}
```

---

## React Native App Setup

You can download the React Native app source code here. (https://github.com/giangbc2k4/RealTemp-ESP32.git)

After cloning, replace the file firebase.ts with your own configuration (API key, DB URL, email, password).

Run the app normally.

```tsx
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_AUTH_DOMAIN_HERE",
  databaseURL: "YOUR_DATABASE_URL_HERE",
  projectId: "YOUR_PROJECT_ID_HERE",
  storageBucket: "YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "YOUR_APP_ID_HERE",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };

```

---

## Troubleshooting

* Check WiFi credentials if ESP32 can't connect.
* Verify Firebase API key and database URL.
* Ensure Firebase Realtime Database rules allow authenticated read/write.
* Double-check wiring for LEDs and sensors.
* Use Serial Monitor to track errors.

---

## License

MIT License — Free to use and modify.

---
