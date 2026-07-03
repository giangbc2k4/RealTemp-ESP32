# RealTemp-ESP32

Hệ thống ESP32 theo dõi nhiệt độ, độ ẩm và điều khiển nhiều đèn theo thời gian thực. ESP32 đọc DHT11, đồng bộ Firebase Realtime Database và nhận lệnh từ ứng dụng React Native/Expo.

## Tính năng

- ESP32 đọc nhiệt độ và độ ẩm từ DHT11.
- Đồng bộ Firebase theo thời gian thực.
- Điều khiển nhiều đèn từ Firebase/ứng dụng di động.
- Ứng dụng Expo để giám sát và điều khiển.
- Có video demo và tài liệu phần cứng.

## Công nghệ

- ESP32
- Arduino IDE or PlatformIO
- DHT11 sensor
- Firebase Realtime Database
- Expo
- React Native
- TypeScript

## Phần cứng cần thiết

| Component | Quantity | Notes |
| --- | ---: | --- |
| ESP32 Dev Board | 1 | Any common ESP32 development board |
| Cảm biến DHT11 | 1 | Đo nhiệt độ và độ ẩm |
| LED | 3 | Nối với các chân GPIO |
| Dây jumper | Theo nhu cầu | Dùng để đấu nối |
| Breadboard | 1 | Không bắt buộc |

## Đấu nối

| ESP32 Pin | Component |
| --- | --- |
| GPIO4 | DHT11 data |
| GPIO2 | LED 1 |
| GPIO15 | LED 2 |
| GPIO5 | LED 3 |
| GND | Common ground |

Điều chỉnh chân GPIO trong sketch nếu cách đấu nối của bạn khác bảng trên.

## Cấu trúc dự án

```text
ESP32/sketch_may14a/       Arduino sketch for ESP32
App/dht11-app/             Expo mobile app
```

## Cài đặt firmware

1. Cài ESP32 board support trong Arduino IDE hoặc PlatformIO.
2. Cài các thư viện cần thiết:
   - Firebase ESP Client
   - DHT sensor library
   - WiFi library for ESP32
3. Cấu hình Wi-Fi và Firebase trong sketch.
4. Upload sketch lên ESP32.

## Cài đặt ứng dụng di động

```bash
cd App/dht11-app
npm install
npm start
```

Chạy trên nền tảng mong muốn:

```bash
npm run android
npm run ios
npm run web
```

## Demo và bản ứng dụng

- Video demo: https://youtu.be/XzEVSjrkoaY
- Tải bản ứng dụng: https://drive.google.com/file/d/1YZ6uRNtUzphLIVL4PBOrauZwbSCO0E0m/view

## Lưu ý bảo mật

Không dùng Firebase Rules mở trong production. Hãy bật xác thực và giới hạn quyền đọc/ghi trước khi đưa hệ thống ra ngoài môi trường thử nghiệm.

## Kiến trúc và luồng dữ liệu

The ESP32 reads the DHT11 and publishes sensor values to Firebase Realtime Database. The Expo app subscribes to those values and writes three light states; the ESP32 receives the state changes and updates its GPIO outputs. Firmware and app must use the same database paths and data types.

## Cấu hình Firebase

Create a Firebase project and Realtime Database, then update both the Arduino sketch and `App/dht11-app/constants/firebase.ts`. Use Authentication and restrictive database rules; the client UI is not an authorization boundary. Store sensor timestamps so the app can clearly show stale/offline data.

## Kiểm tra phần cứng

DHT11 should not be polled too frequently. Confirm the GPIO choices do not conflict with ESP32 boot strapping. Real loads require a relay/transistor, flyback protection and suitable power supply—never drive a mains device directly from GPIO. Define a safe output state for lost Wi-Fi, Firebase errors and reboot.

## Checklist độ tin cậy

- Thêm reconnect có backoff, timeout, watchdog và serial log hữu ích.
- Kiểm tra dữ liệu Firebase trước khi ghi GPIO.
- Kiểm thử từng đèn, lệnh đồng thời và cảm biến bị ngắt.
- Hiệu chỉnh bằng thiết bị đo tham chiếu.
- Thêm OTA ký số và định danh thiết bị trước production.
