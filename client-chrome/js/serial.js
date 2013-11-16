$(function(){
  var connectionId = 0;
  var intervalId   = 0;
  var bitRate      = {"bitrate":9600};
  
  var $startButton = $('#start');
  var $endButton = $('#end');
  var $selectPort = $('#ports');

  //animationInit();

  var counter = new Counter();

  var serialReadData = function() {
    var readByte = 64;
    chrome.serial.read(connectionId, readByte, function (readInfo){
      if(readInfo.bytesRead > 0){
        var arr = new Uint8Array(readInfo.data);
        var data = String.fromCharCode.apply(null, arr);
        console.log(data);

        // counter increment
        var re = /1/;
        var ar = re.exec(data);
        if (ar[0] != undefined) {
          //animationStart(5);
          counter.increment();
        }
      }
    });
  };
  var serialStart = function() {
    var portName = $selectPort.val();
    chrome.serial.open(portName, bitRate, function(openInfo){
      connectionId = openInfo.connectionId;
      this.intervalId = setInterval(function() {
        serialReadData();
      }, 1000);
    });

    $startButton.hide();
    $selectPort.hide();
    $endButton.show();
  };
  var serialEnd = function() {
    chrome.serial.close(connectionId, function(result){
      if (result == true) clearInterval(intervalId);
      else console.log("close fail");
    });

    $startButton.show();
    $selectPort.show();
    $endButton.hide();
  };
  
  chrome.serial.getPorts(function (ports) {
    for (var i=0; i<ports.length; i++) {
      var port = ports[i];
      $selectPort.append(new Option(port, port));
    }
  });
  $startButton.click(function() {
    serialStart();
  });
  $endButton.click(function() {
    serialEnd()
  });
});
