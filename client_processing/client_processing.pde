import processing.serial.*;
Serial port;
int x;
int count;

Firework[] fs = new Firework[10];
boolean once;
void setup()
{
  port=new Serial(this, "/dev/tty.usbmodemfa131", 9600);
  
  count = 0;
  
  size(1000,500);
  smooth();
  for (int i = 0; i < fs.length; i++){
    fs[i] = new Firework();
  }
}
 
void draw()
{
  noStroke();
  fill(0,0,0,20);
  rect(0,0,width,height);
  for (int i = 0; i < fs.length; i++){
    fs[i].draw();
  }
  
  // count view
  fill(255);
  textSize(150);
  textAlign(CENTER);
  text(count, width / 2, height / 2);
}
 
void serialEvent(Serial p)
{
  x=port.read();
  System.out.println(x);
  if(x == 1) {
    count += 1;
    
    //Animation
    for(int j=0;j < 10; j++) {
      once = false;
      for (int i = 0; i < fs.length; i++){
        if((fs[i].hidden)&&(!once)){
          fs[i].launch();
          once = true;
        }
      }
    }
  }
}

