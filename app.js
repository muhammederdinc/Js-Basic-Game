var gamePiece;
var obstacles = [];
var gameScore;

function startGame() {
  gamePiece = new gameComponent(30, 30, "red", 10, 120);
  gameScore = new gameComponent("25px", "consolas", "black", 0,25, "text");
  playGround.start();
}

var playGround = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 600;
    this.canvas.height = 400;
    this.frameNumber = 0;
    this.context = this.canvas.getContext("2d");
    this.interval = setInterval(updatePlayGround, 20);

    document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    window.addEventListener('keydown', (e) => {
      playGround.keys = (playGround.keys || []); //to press multiple direction keys
      playGround.keys[e.keyCode] = (e.type == "keydown");
    });

    window.addEventListener('keyup', (e) =>{
      playGround.keys[e.keyCode] = (e.type == "keydown");
    });
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: () => {
    clearInterval(this.interval);
  },
};

function eachInterval(n) {
  if((playGround.frameNumber/n) % 1 == 0) return true;

  return false;
}

//draw a square frame on the canvas
function gameComponent(width, height, color, x, y, type) {
  this.type = type;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;

  this.update = () => {
    ctx = playGround.context;

    if(this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x,this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x,this.y,this.width,this.height);
    }
  }

  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;

    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }

    return crash;
  }

  this.newPosition = () => {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

updatePlayGround = () =>{
  var x, height, gap, minHeight, maxHeight, minGap, maxGap;

  for(i=0; i<obstacles.length; i+=1) {
    if(gamePiece.crashWith(obstacles[i])) {
      playGround.stop();

      return;
    }
  }
    
  playGround.clear();
  playGround.frameNumber += 1;

  if(playGround.frameNumber == 1 || eachInterval(50)) {
    x = playGround.canvas.width;
    minHeight = 25;
    maxHeight = 200;
    minGap = 50;
    maxGap = 200;
    height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    obstacles.push(new gameComponent(10, height, "green", x, 0));
    obstacles.push(new gameComponent(10, x-height-gap, "green", x, height + gap));
  }

  for(i=0; i<obstacles.length; i+=1) {
    obstacles[i].speedX = -4;
    obstacles[i].newPosition();
    obstacles[i].update();
  }

  gameScore.text = "Skor: " + playGround.frameNumber;
  gameScore.update();
  gamePiece.update();
  gamePiece.newPosition();
  
  if(playGround.keys && (playGround.keys[37] || playGround.keys[65])) gamePiece.x -= 2; //move left
  if(playGround.keys && (playGround.keys[39] || playGround.keys[68])) gamePiece.x += 2; //move right
  if(playGround.keys && (playGround.keys[38] || playGround.keys[87])) gamePiece.y -= 2; //move up
  if(playGround.keys && (playGround.keys[40] || playGround.keys[83])) gamePiece.y +=2; //move down
}
