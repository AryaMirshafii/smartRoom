int solenoidPin = 13;                    //This is the output pin on the Arduino

void setup() 
{
  pinMode(solenoidPin, OUTPUT);          //Sets that pin as an output
  //Serial.begin(9600);
}

void loop() 
{
  digitalWrite(solenoidPin, HIGH);      //Switch Solenoid ON
  //Serial.println("Setting solenoid to HIGH");
  delay(1000);                          //Wait 1 Second
  digitalWrite(solenoidPin, LOW);       //Switch Solenoid OFF
  //Serial.println("Setting solenoid to LOW");
  delay(1000);                          //Wait 1 Second
}
