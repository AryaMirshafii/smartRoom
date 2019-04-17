#include <Servo.h>

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards


int buttonPressCount = 0;
int buttonState = 0;
int buttonPin = 2;
void setup() {
  myservo.attach(5);  // attaches the servo on pin 9 to the servo object
  pinMode(buttonPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  buttonState = digitalRead(buttonPin);
  if (buttonState == HIGH) {
    Serial.println("BUtton Pressed " + String(buttonPressCount));
    if(buttonPressCount % 2 == 0){
        turnServoLightON();
    }else if(buttonPressCount % 2 == 1){
      turnServoLightOFF();
      
    }

    buttonPressCount++;
  }
}


void turnServoLightON()
{
for (int pos = 180; pos >= 0; pos -= 10) { // goes from 180 degrees to 0 degrees
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }
}
void turnServoLightOFF()
{
  for (int pos = 0; pos <= 180; pos += 10) { // goes from 0 degrees to 180 degrees
    // in steps of 1 degree
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(15);                       // waits 15ms for the servo to reach the position
  }
}
