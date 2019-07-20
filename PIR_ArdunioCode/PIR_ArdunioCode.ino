#define SIGNAL_PIN 12

double motionCount = 0;
void setup()
{
  Serial.begin(9600);
  //pinMode(SIGNAL_PIN, INPUT);
  //digitalWrite (SIGNAL_PIN, LOW);
}
void loop() {
  
  checkMotion();
  
  delay(1000);
}

void checkMotion(){
  int pinAnalog = analogRead(SIGNAL_PIN);
    Serial.println(pinAnalog);
  /*
  if(digitalRead(SIGNAL_PIN)==HIGH) {
    
    Serial.println("..........Movement detected...........");
    motionCount++;
    
  } else {
    Serial.println("Did not detect movement.");
  }

  if(motionCount >= 16){
    
    motionCount = 0;
  }
  */
}

