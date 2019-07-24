#define CAMERA_MODEL_AI_THINKER
#include "esp_camera.h"
#include "camera_pins.h"
#include <WiFi.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <EEPROM.h>
#include <sstream>
#include <string.h>
#include <iomanip>
#include <stdlib.h>

#define EEPROM_SIZE 512
#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"
const char* ssid = "The Standard";

void startCameraServer();

const int CAMERA_PIN = 14;
const String roomAddress = "https://gtoqgc0nbl.execute-api.us-east-1.amazonaws.com/dev/rooms";

int RoomIdBase = 0;

BLECharacteristic *pCharacteristic;

void setup() {
  RoomIdBase = sizeof(*ssid);
  Serial.println("The size of ssid is" + RoomIdBase);
  
  if (EEPROM.begin(EEPROM_SIZE))
  {
    Serial.println("Intialized EEPROM");
  }
  pinMode(CAMERA_PIN,INPUT_PULLUP);
  Serial.begin(115200);
  setUpBluetooth();
  Serial.setDebugOutput(true);
  Serial.println();
  
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  //init with high specs to pre-allocate larger buffers
  if(psramFound()){
    config.frame_size = FRAMESIZE_UXGA;
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }

#if defined(CAMERA_MODEL_ESP_EYE)
  pinMode(13, INPUT_PULLUP);
  pinMode(14, INPUT_PULLUP);
#endif

  // camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }

  sensor_t * s = esp_camera_sensor_get();
  //initial sensors are flipped vertically and colors are a bit saturated
  if (s->id.PID == OV3660_PID) {
    s->set_vflip(s, 1);//flip it back
    s->set_brightness(s, 1);//up the blightness just a bit
    s->set_saturation(s, -2);//lower the saturation
  }
  //drop down frame size for higher initial frame rate
  s->set_framesize(s, FRAMESIZE_QVGA);

#if defined(CAMERA_MODEL_M5STACK_WIDE)
  s->set_vflip(s, 1);
  s->set_hmirror(s, 1);
#endif

  WiFi.begin(ssid);
  

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");

  startCameraServer();

  Serial.print("Camera Ready! Use 'http://");
  Serial.print(WiFi.localIP());
  Serial.println("' to connect");
}

void loop() {
  // put your main code here, to run repeatedly:
  if (WiFi.status() == WL_NO_SHIELD || WiFi.status() == WL_CONNECT_FAILED || WiFi.status() == WL_CONNECTION_LOST || WiFi.status() == WL_DISCONNECTED ) {
    Serial.println("Error With wifi ");
    
  }

  if(digitalRead(CAMERA_PIN) == LOW){
    Serial.println("Updating room");
  }
  
  checkRoomId();
  delay(1000);
}

void setUpBluetooth(){
  BLEDevice::init("SmartRoom");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);
  pCharacteristic = pService->createCharacteristic(
                                         CHARACTERISTIC_UUID,
                                         BLECharacteristic::PROPERTY_READ |
                                         BLECharacteristic::PROPERTY_WRITE
                                       );

  pCharacteristic->setValue("Hello World says Neil");
  pService->start();
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  // functions that help with iPhone connections issue
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
}

void updateRoom(){
  
}

void checkRoomId(){
  const char* bluetoothData = pCharacteristic->getValue().c_str();
  //Serial.println(bluetoothData);
  String writtenData = getRoomId();
  writeRoomId(bluetoothData);
  Serial.println("Written data is" + writtenData);
}

void writeRoomId(String data){
  int _size = data.length();
  int i;
  for(i=0;i<_size;i++)
  {
    //Serial.println("writing " + data[i]);
    EEPROM.write(RoomIdBase+i,data[i]);
  }
  EEPROM.write(RoomIdBase+_size,'\0');
  EEPROM.commit();
  Serial.println("wrote: " + data);
}

String getRoomId(){
  int i;
  char data[100]; //Max 100 Bytes
  int len=0;
  unsigned char k;
  k=EEPROM.read(RoomIdBase);
  while(k != '\0' && len<500)   //Read until null character
  {    
    k=EEPROM.read(RoomIdBase+len);
    data[len]=k;
    len++;
    //Serial.println("reading " + k);
  }
  data[len]='\0';
  return String(data);
}

