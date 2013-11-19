import processing.serial.*;
import twitter4j.conf.*;
import twitter4j.internal.async.*;
import twitter4j.internal.org.json.*;
import twitter4j.internal.logging.*;
import twitter4j.http.*;
import twitter4j.internal.util.*;
import twitter4j.api.*;
import twitter4j.util.*;
import twitter4j.internal.http.*;
import twitter4j.*;

String consumerKey    = "your consumer key";
String consumerSecret = "your consumer secret";
String accessToken    = "your access token";
String accessSecret   = "your access secret";
Twitter myTwitter;

Serial port;
int x;
int count;

Firework[] fs = new Firework[10];
boolean once;
void setup()
{
  port=new Serial(this, "/dev/cu.usbmodemfa131", 9600);
  
  count = 0;
  
  size(1000,500);
  smooth();
  for (int i = 0; i < fs.length; i++){
    fs[i] = new Firework();
  }
  
  ConfigurationBuilder cb = new ConfigurationBuilder();
  cb.setOAuthConsumerKey(consumerKey);
  cb.setOAuthConsumerSecret(consumerSecret);
  cb.setOAuthAccessToken(accessToken);
  cb.setOAuthAccessTokenSecret(accessSecret);
  myTwitter = new TwitterFactory(cb.build()).getInstance();
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
    
    //tweet
    try {
      Status st = myTwitter.updateStatus("TeResCount: " + count);
      println("Successfully updated the status to [" + st.getText() + "].");
    }
    catch (TwitterException e) {
      println(e.getStatusCode() + " error");
    }
    
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

