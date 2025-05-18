#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <DHT.h>

// WiFi
#define WIFI_SSID "Giang Tran"
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
#define LED1_PIN 2    // đèn nhiệt độ > 35
#define LED2_PIN 5    // đèn nhiệt độ <= 35
#define LED3_PIN 15   // đèn bật/tắt riêng (hoặc nhấp nháy nếu mở rộng)

// Firebase objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

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
  Serial.println("\n✅ Đã kết nối WiFi");

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
  Serial.println("\n✅ Đã đăng nhập Firebase thành công");
}
void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("❌ Lỗi cảm biến DHT11");
    return;
  }

  // 🔼 VẪN gửi dữ liệu như thường
  Firebase.RTDB.setFloat(&fbdo, "/esp32/temperature", temperature);
  Firebase.RTDB.setFloat(&fbdo, "/esp32/humidity", humidity);

  Serial.print("🌡 Nhiệt độ: ");
  Serial.print(temperature);
  Serial.print(" °C, 💧 Độ ẩm: ");
  Serial.println(humidity);

  // 🔍 Đọc biến all
  bool allControl = false;
  if (Firebase.RTDB.getBool(&fbdo, "/esp32/control/all")) {
    allControl = fbdo.boolData();
  }

  // 👉 Chỉ xử lý đèn
  if (!allControl) {
    digitalWrite(LED1_PIN, LOW);
    digitalWrite(LED2_PIN, LOW);
    digitalWrite(LED3_PIN, LOW);
    Serial.println("🔌 Tắt đèn (all=false), nhưng vẫn gửi dữ liệu.");
  } else {
    // Bật đèn theo điều kiện nhiệt độ
    if (temperature > 35) {
      digitalWrite(LED1_PIN, HIGH);
      digitalWrite(LED2_PIN, LOW);
    } else {
      digitalWrite(LED1_PIN, LOW);
      digitalWrite(LED2_PIN, HIGH);
    }

    // LED3 theo Firebase
    if (Firebase.RTDB.getBool(&fbdo, "/esp32/control/led3")) {
      bool led3State = fbdo.boolData();
      digitalWrite(LED3_PIN, led3State ? HIGH : LOW);
    } else {
      digitalWrite(LED3_PIN, LOW); // Tắt nếu không có biến
    }
  }

  delay(10000); // Lặp sau 10 giây
}
