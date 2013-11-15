void setup(){
  Serial.begin(9600);
}

void loop() {
  //ここでbuttonのon/offの判断する
  boolean flag = true; //今はテスト用
  if(flag) {
    Serial.write("1");
  }else {
    Serial.write("0");
  }
  
  delay(5000);
}
