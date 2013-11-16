#define BUTTON 2

int state=0, lastState=1;
void setup() {
  pinMode(BUTTON, INPUT);
  Serial.begin(9600);
}

void loop() {
  //ここでbuttonのon/offの判断する
  state = digitalRead(BUTTON);
  if(state != lastState && state == HIGH) {
    Serial.write(1);
  }
  lastState = state;
}
