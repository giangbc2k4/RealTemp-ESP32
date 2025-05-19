#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>

// WiFi
#define WIFI_SSID "Giang"
#define WIFI_PASSWORD "21012004"

// Firebase
#define API_KEY "AIzaSyDTVvERiIX_KCx2DTnSXD7obJlIpm8gdmc"
#define DATABASE_URL "https://esp32-4b84c-default-rtdb.firebaseio.com/"
#define USER_EMAIL "trantruonggiang2112004@gmail.com"
#define USER_PASSWORD "123456"

// DHT11
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// LED pins
#define LED1_PIN 2
#define LED2_PIN 5
#define LED3_PIN 15

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long previousMillis = 0;
const long interval = 1000;

void setup() {
  Serial.begin(115200);
  dht.begin();

  pinMode(LED1_PIN, OUTPUT);
  pinMode(LED2_PIN, OUTPUT);
  pinMode(LED3_PIN, OUTPUT);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Đang kết nối WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n Đã kết nối WiFi");

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  while (auth.token.uid == "") {
    Serial.print(".");
    delay(1000);
  }
  Serial.println("\n Đã đăng nhập Firebase thành công");
}

void loop() {
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    if (isnan(temperature) || isnan(humidity)) {
      Serial.println(" Lỗi cảm biến DHT11");
      return;
    }

    Firebase.RTDB.setFloat(&fbdo, "/esp32/temperature", temperature);
    Firebase.RTDB.setFloat(&fbdo, "/esp32/humidity", humidity);

    Serial.printf(" Nhiệt độ: %.1f °C,  Độ ẩm: %.1f\n", temperature, humidity);

    bool allControl = false;
    if (Firebase.RTDB.getBool(&fbdo, "/esp32/control/all")) {
      allControl = fbdo.boolData();
    }

    if (!allControl) {
      digitalWrite(LED1_PIN, LOW);
      digitalWrite(LED2_PIN, LOW);
      digitalWrite(LED3_PIN, LOW);
    } else {
      // all = true

      bool led1State = false;
      bool led2State = false;
      if (Firebase.RTDB.getBool(&fbdo, "/esp32/control/led1")) {
        led1State = fbdo.boolData();
      }
      if (Firebase.RTDB.getBool(&fbdo, "/esp32/control/led2")) {
        led2State = fbdo.boolData();
      }

      
      if (!led1State && !led2State) {
        digitalWrite(LED1_PIN, LOW);
        digitalWrite(LED2_PIN, LOW);
      } else {
      
        if (temperature > 35) {
          digitalWrite(LED1_PIN, HIGH);
          digitalWrite(LED2_PIN, LOW);
        } else {
          digitalWrite(LED1_PIN, LOW);
          digitalWrite(LED2_PIN, HIGH);
        }
      }

      bool led3State = false;
      if (Firebase.RTDB.getBool(&fbdo, "/esp32/control/led3")) {
        led3State = fbdo.boolData();
      }
      digitalWrite(LED3_PIN, led3State ? HIGH : LOW);

    }
  }
}
