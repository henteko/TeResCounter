var _messages;
var messages = [];

function animationStart(num) {
  var anime = function() {
    var text = '••••••••';
    var ms = create_messages(text);
    for(var i=0; i< ms.length; i++) {
      messages.push(ms[i]);
    }
  };
  
  var count = 0;
  var timer = setInterval(function() {
    anime();
    count += 1;
    if (count >= num) clearInterval(timer);
  }, 500);

  onReload(messages);
}

function animationInit() {
  var canvas = $('canvas')[0];
  $(canvas).attr({height: $("#wrapper").height()});
  $(canvas).attr({width: $("#wrapper").width()});
  
  // 初期
  onReload([]);

  setInterval(function() {
    $(_messages).each(function(idx, msg) {
      if(msg.end_y > msg.position.y || msg.finish) {
        if(msg.tita < 20) {
          msg.finish = true;
          //対数螺旋アニメーション
          var r = 100 * Math.pow(0.9, msg.tita);
          msg.position.x = r * Math.cos(msg.tita) + msg.start_position.x;
          msg.position.y = r * Math.sin(msg.tita) + msg.end_y;
          msg.tita += 0.15;
        }else {
          if(msg.stop_time < 0) {
            msg.position_v.vy += 0.098;
            //爆散アニメーション
            msg.position.x += msg.position_v.vx;
            msg.position.y += msg.position_v.vy;

            // 空気抵抗による減速
            msg.position_v.vx *= 0.92;
            msg.position_v.vy *= 0.92;

            //透明に
            msg.alpha -= 0.005;

            if(msg.alpha < 0) {
              _messages.splice(idx,1); 
            }

          }else {
            msg.stop_time--;
          }

        }

      }else {
        if (msg.position.y < 0) {
          //ピューと上がる所アニメーション
          msg.position.y = msg.start_position.y;
        } else {
          msg.position.y -= 4;
        }
      }
    });
    onReload(_messages);
  }, 10);
}

function hanabi() {
}

function randomColor(){
  var colorHue = Math.floor( Math.random() * 360 );
  return "hsl(" + colorHue + ", 100%, 50% )";
}

function create_message(text, px, py, ey, d) {
  var _vx = Math.random() * 20 - 10;
  var _vy = Math.random() * 20 - 10;
  var _vz = Math.random() * 20 - 10;
  var len = Math.sqrt(Math.pow(_vx, 2)+Math.pow(_vy, 2)+Math.pow(_vz, 2));
  _vx = _vx / len * 10;
  _vy = _vy / len * 10;
  _vz = _vz / len * 10;

  return {
    content: text,
      color: randomColor(),
      alpha: 1.0,
      delta: Math.floor( Math.random()*30 ) + 1,
      direction: 1,
      role: 1,
      tita: 1,
      position: ({x: px, y: py}),
      position_v: ({vx: _vx, vy: _vy}),
      stop_time: d,
      start_position: ({x: px, y: px}),
      end_y: ey,
      finish: false
  };
}

function create_messages(text) {
  var messages = [];
  var dd = text.length / (text.length / 6);
  var px = Math.floor( Math.random() * $("#wrapper").width() - 150 );
  while(px <= 100) {
    px = Math.floor( Math.random() * $("#wrapper").width() - 150 );
  }
  var py = $("#wrapper").height();
  var ey = Math.floor( Math.random() * ($("#wrapper").height() / 10)) + 50;

  for(var i=0; i< text.length; i++) {
    var d = (dd * (text.length - i));
    messages.push(create_message(text.charAt(i), px, py+(i*20), ey, d));
  }
  return messages;
}

function onReload(messages) {
  var canvas = $('canvas')[0];
  $('canvas').css('background-color', 'black');
  var context = canvas.getContext('2d');

  // キャンバスクリア
  context.clearRect(0, 0, $(canvas).width(), $(canvas).height());
  $(messages).each(function(idx, msg) {
    context.font = 'Normal 40pt System';
    context.shadowColor = 'white';
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 10;
    context.fillStyle = randomColor();
    context.globalAlpha = msg.alpha;
    context.fillText(msg.content, msg.position.x, msg.position.y);
  });

  _messages = messages;
}

function expandCanvas(canvas){
  var b = document.body;
  var d = document.documentElement;
  canvas.width = Math.max(b.clientWidth , b.scrollWidth, d.scrollWidth, d.clientWidth);
  canvas.height = Math.max(b.clientHeight , b.scrollHeight, d.scrollHeight, d.clientHeight);
  return canvas;
}
