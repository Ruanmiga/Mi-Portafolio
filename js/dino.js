const FPS = 60;
const MAX_VELOCITY = 15;
const level = {velocity: 6, score: 0,isDead: false};
var trex,obstacle,nube;
var canvas, ctx, width, height;
var isPlaying = false;
var sprite;
var plane = {clip: 100,x: 0, width: 2404, height: 30};
var frameInterval = 0;
var bool = false;
var highscore = 0;
var velocyInterval = 0;
var obstacleSprite = generatePic();

function loadConst(){
	canvas = document.getElementById('canvas');
   ctx = canvas.getContext('2d');
   
   width = canvas.width;
   height = canvas.height;
   
   trex = {x: canvas.width/7, y: height - 64, vy: 0, gravity: 2, jump: 21, amax: 9,w: 58,h: 64, isJump: false};
   obstacle = {x: width + 200, y: height - 60, width: 30, height: 60};
   nube = {clip: 170,y: 20, x: width + 200, width: 45,height: 30,velocity: 3};
   
   loadRes();
   
  // window.requestAnimationFrame(update);
   canvas.addEventListener('touchstart', () => {
   	if (!isPlaying) {
   		isPlaying = true;
   	}
   	if (level.isDead) {
   		obstacle.x = width + 200;
   		level.velocity = 6;
   		level.isDead = false;
   		nube.velocity = 3;
   	} else {
   		jump();
   	}
   });
   
   document.addEventListener('keydown', (e) => {
   	if (e.keyCode == 32) {
   		if (!level.isDead) {
   			jump();
   		}
   	}
   });
   
   setInterval(()=>{
	update();
},1000/FPS);


}
   
function loadRes(){
	 sprite = new Image();
	 sprite.src = "res/sprite.png";
}

function jump(){
	if(!trex.isJump){
	trex.isJump = true;
	trex.vy = trex.jump;
	}
}

function gravity(){
	if(trex.isJump){
		if((trex.y - trex.vy - trex.gravity) > (height - trex.h)){
			trex.isJump = false;
			trex.vy = 0;
			trex.y = height - trex.h;
		}else{
			trex.vy -= trex.gravity;
			trex.y -= trex.vy;
		}
	}
}

function logicalPlane(){
	if(plane.x >= 2040 - width){
		plane.x = 0;
	}else{
		plane.x += level.velocity;
	}

}
function logicalNube(){
	if(nube.x < -100){
		nube.x = width + 200;
		nube.y = randomNubePosition();
	}else{
		nube.x -= nube.velocity;
	}
}

function logicalObstacle(){
	if(obstacle.x < -100){
		obstacleSprite = generatePic();
		obstacle.x = width + 200;
	}else{
		obstacle.x -= level.velocity;
	}
}

function collision(){
	 if(obstacle.x >= trex.x && obstacle.x <= trex.x + trex.w){
	 	 if(trex.y >= obstacle.height){
	 	    level.isDead = true;
	 	    level.velocity = 0;
	 	    nube.velocity = 0;
	 	    
	 	    if(level.score > highscore){
	 	       highscore = level.score;
	       }
	       
	 	    level.score = 0;
	 	    
	 	 }
	 }
}
function logicalScore(){
	 level.score++;
	 
	 velocyInterval++;
	 if(velocyInterval > 250){
	 	if(level.velocity >= MAX_VELOCITY){
	 		leve.velocity = MAX_VELOCITY;
	 	}else{
	 	 level.velocity += 0.6;
	 	 velocyInterval = 0;
	 	}
	 }
}

function draw(){
	
	ctx.drawImage(sprite,plane.x,plane.clip,plane.width,plane.height,0,height-plane.height,plane.width,plane.height);
	
	ctx.drawImage(sprite, nube.clip, 0, 90,30,nube.x, nube.y,nube.width,nube.height);
	
	frameInterval++;
   if (frameInterval > 5){
       bool = !bool;
    frameInterval = 0;
  }
    else{
  }
  
	var frame = 1338;
	
	if(bool && trex.isJump){
		frame = 1514;
	}else if(!bool && trex.isJump){
		frame = 1602;
	}
	else{
		frame = 1338;
	}
	
	var ss = 80;
	var hs = 110;
	
	
	if(level.score >= 100 && level.score <= 999) ss = 90;
	else if(level.score >= 1000) ss = 110;
	else 80;
	
	if(highscore >= 100 && highscore <= 999) hs = 120;
	else if(highscore >= 1000) hs = 130;
	else 110;
	
	ctx.drawImage(sprite,frame,0,88,94,trex.x,trex.y,trex.w,trex.h);
	
	ctx.drawImage(sprite,obstacleSprite,2, 49, 100, obstacle.x, obstacle.y,obstacle.width,obstacle.height);
	
	
	/**ctx.arc(trex.x,trex.y,10,0,2*Math.PI);
	ctx.fillStyle = "#000";
	ctx.fill();**/
	
	ctx.beginPath();
	
	ctx.font = "0.8em retro";
	ctx.fillStyle = "#808080";
	ctx.fillText(`Score: ${level.score}`,width - ss,20);
	
	if(highscore != 0){
	ctx.font = "0.8em retro";
	ctx.fillStyle = "#808080";
	ctx.fillText(`Highscore: ${highscore}`,width - hs,40);
	}
	
	if(!isPlaying){
		ctx.font = "0.8em retro";
	   ctx.fillStyle = "#808080";
   	ctx.fillText(`Toque para Jugar`,width/4,height/2);
	}
	
	if(level.isDead){
		ctx.font = "1.3em retro";
	   ctx.fillStyle = "#808080";
   	ctx.fillText(`MUERTO`,width/3,height/2);
	}
}

function update(){
	clearCanvas();
	if(isPlaying){
	gravity();
	logicalPlane();
	logicalObstacle();
	logicalNube();
	logicalScore();
	collision();
	}
	draw();
}

function clearCanvas(){
 ctx.clearRect(0,0,width,height);
}

function randomNubePosition(){
	return Math.round(Math.random() * ((width / 3)- 20)) + 20;
}
function generatePic(){
	let picB = 652 + (Math.floor(Math.random() * 2) * 150);
	return picB;
}
