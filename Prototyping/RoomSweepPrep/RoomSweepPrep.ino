#define servoPin 13        //Onboard LED = digital pin 13
 #include <Servo.h>

 Servo  servo;
 const int buttonPin = 12;
 unsigned int data = 0;   // variable used tostore received data
 const unsigned int upperThreshold = 70;  //upper threshold value
 const unsigned int lowerThreshold = 50;  //lower threshold value
 int buttonState = LOW;

 void setup(){
   
   Serial.begin(9600);
   servo.attach(servoPin);
 }

 void loop(){
    /*
   data=analogRead(rfReceivePin);    //listen for data on Analog pin 0
   
    if(data<upperThreshold){

     Serial.println(data);
     servo.write(0);
   }
   
   if(data>lowerThreshold){
     
     Serial.println(data);
     servo.write(90);
   }
   */

  buttonState = digitalRead(buttonPin);

  // check if the pushbutton is pressed. If it is, the buttonState is HIGH:
  if (buttonState == HIGH) {
    // turn LED on:
    Serial.println("ON");
    servo.write(0);
  } else {
    // turn LED off:
    servo.write(90);
    Serial.println("OFF");
  }
 }

