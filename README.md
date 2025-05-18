
# ESP32 Real-Time Temperature Monitoring & Multi-Light Control with Firebase

## Overview

This project uses an ESP32 microcontroller connected to a DHT11 temperature and humidity sensor, combined with Firebase Realtime Database for real-time monitoring and control of multiple LEDs. You can remotely monitor temperature data and control LEDs through Firebase or a connected app.

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

* Arduino IDE (or PlatformIO)
* ESP32 Board Support Installed
* Libraries:

  * `Firebase ESP Client`[https://github.com/mobizt/Firebase-ESP-Client](https://github.com/mobizt/Firebase-ESP-Client)
  * `DHT sensor library`(https://github.com/adafruit/DHT-sensor-library)
  * `WiFi`(https://github.com/espressif/arduino-esp32)

---

## Wiring Diagram

| ESP32 Pin | Component  | Description          |
| --------- | ---------- | -------------------- |
| GPIO4     | DHT11 Data | Data pin from sensor |
| GPIO2     | LED1       | LED 1                |
| GPIO15    | LED2       | LED 2                |
| GPIO5    | LED3       | LED 3                |
| GND       | All GND    | Common Ground        |

*Adjust GPIO pins in code if your wiring differs.*

---

## Setup Instructions

### 1. Prepare Firebase

* Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
* Enable **Realtime Database** and set proper rules for read/write.
* Get your project API key and Realtime Database URL.
* Enable Email/Password authentication

### 2. Configure Code

* Replace WiFi SSID and Password with your network credentials.
* Insert Firebase API key and Database URL in the code constants.
* Adjust GPIO pins if needed.

### 3. Upload Code

* Open the project in Arduino IDE or PlatformIO.
* Install all required libraries.
* Upload the firmware to ESP32.
* Open Serial Monitor to verify WiFi and Firebase connections.

---

## Functional Description

* **Temperature & Humidity Reading:** ESP32 reads data from DHT11 periodically.
* **Firebase Sync:** Sensor data and LED control commands are synced with Firebase Realtime Database.
* **LED Control Logic:**

  * When `all = false`: All LEDs are forced OFF regardless of other flags.
  * When `all = true`:

    * LEDs 1 and 2 follow temperature-based automatic control *only if* at least one of `led1` or `led2` flags in Firebase is `true`. Otherwise, they remain OFF.
    * LED 3 state follows the `led3` flag in Firebase directly.

---

## Firebase Data Structure Example

```json
{
  "esp32": {
    "control": {
      "all": true,
      "led1": true,
      "led2": false,
      "led3": true
    },
    "sensor": {
      "temperature": 27.5,
      "humidity": 60
    }
  }
}
```

---

## Usage Notes

* Ensure ESP32 has stable WiFi connection to sync data correctly.
* Use Firebase Console or your custom app to toggle `all`, `led1`, `led2`, and `led3` to control the LEDs.
* Temperature-based LED logic runs automatically when conditions above are met.

---

## Troubleshooting

* **ESP32 can’t connect to WiFi:** Check SSID/Password and signal strength.
* **Firebase connection issues:** Verify API key, database URL, and database rules.
* **LEDs not responding:** Double-check wiring and GPIO pin assignment.
* **Data not updating:** Ensure ESP32 has internet access and no firewall blocking Firebase.

---

## License

This project is open source and free to use under the MIT License.

---

Nếu bạn muốn, tôi có thể giúp bạn viết thêm phần hướng dẫn cấu hình Firebase hoặc mẫu app điều khiển trên React Native nhé.
