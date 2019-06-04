#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <WiFi.h>
#include "User.h" 
const char* ssid = "The Standard";
const char* password =  "yourNetworkPass";
const char* USERS_URL = "https://03t02obapg.execute-api.us-east-1.amazonaws.com/dev/users";
const int GET_TIME_INTERVAL = 20000;



User* user;
void setup() {
 
  Serial.begin(115200);
  delay(4000);
  WiFi.begin(ssid);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
 
  Serial.println("Connected to the WiFi network");
  createUser();
  
 
}
 
void loop() {
 
  
  delay(GET_TIME_INTERVAL);
 
}

void createUser(){


  if ((WiFi.status() == WL_CONNECTED)) { //Check the current connection status
 
    HTTPClient http;
 
    http.begin(USERS_URL); //Specify the URL
    int httpCode = http.GET();                                      //Make the request
 
    if (httpCode > 0) { //Check for the returning code
 
        String payload = http.getString();
        payload = payload.substring(1, payload.length() -1);
        //Serial.println(httpCode);
        //Serial.println(payload);
        StaticJsonDocument<400> document;
        const char* jsonArr = payload.c_str() ;
        
        Serial.println(jsonArr);
        DeserializationError error = deserializeJson(document, jsonArr);


        if (error) {
            Serial.print(F("deserializeJson() failed: "));
            Serial.println(error.c_str());
            return;
        }else{
          user = new User();
          const char* firstName = document["firstName"];
          const char* lastName = document["lastName"];
          const char* id = document["id"];
          const char* email = document["email"];
          const char* password = document["password"];
          user->firstName = firstName;
          user->id = lastName;
          user->lastName = id;
          user->email = email;
          user->email = password;
          
          Serial.println(user->firstName);
          Serial.println(user->lastName);
          Serial.println(user->id);
          Serial.println(user->email);
          Serial.println(user->password);
          
        }
        
        
        
      }
 
    else {
      Serial.println("Error on HTTP request");
    }
 
    http.end(); //Free the resources
  }
 
  
}

