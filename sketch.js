
var monkey , monkey_running,ground,ground2;
var banana ,bananaImage, obstacle, obstacleImage,ground_image,monkeytouch;
var FoodGroup, obstacleGroup;
var survivaltime;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  ground_image = loadImage("ground2.png");
  
  monkeytouch = loadImage("gameover.png");
 
}



function setup() {
 createCanvas(600,600);
 monkey = createSprite(85,500,10,10);  
 monkey.addAnimation("monkey_image",monkey_running);
 monkey.scale=0.2;
 
 ground = createSprite(300,550,600,20);
 ground.addImage(ground_image);
 ground.x = ground.width /2;
  
 ground2 = createSprite(200,565,400,10);
 ground2.visible=false;
  
 FoodGroup = new Group();
  
 ObstacleGroup = new Group();
  
 survivaltime = 0;
  
 score = 0;
}


function draw() {
background("white");
  
stroke("white");
textSize(20);
fill("black");
text("Survival Time: "+survivaltime,240,50);
  
stroke("white");
textSize(20);
fill("black");
text("Bananas Collected: "+score,220,90);

if (gameState===PLAY){
ground.velocityX=-3;
if (ground.x < 0){
     ground.x = ground.width/2;
}
if (keyDown("space")&&monkey.y >= 300){
     monkey.velocityY=-12; 
}
if (FoodGroup.isTouching(monkey)){
  score = score+1;
  FoodGroup.destroyEach();
}
if (ObstacleGroup.isTouching(monkey)){
  gameState = END;
}
spawnBanana();
spawnObstacles();
survivaltime=Math.ceil(frameCount/frameRate());

 }
 if (gameState===END){
  var gO = createSprite(300,300,10,10);
  gO .addImage(monkeytouch);
  gO.scale=2.0;
  FoodGroup.destroyEach();
  ObstacleGroup.destroyEach();
  ground.destroy();
  monkey.destroy();
}
monkey.velocityY = monkey.velocityY+0.8;
ground.depth=monkey.depth;
monkey.depth=ground.depth + 1;
monkey.collide(ground2);
drawSprites();
  
}
function spawnBanana(){
  if (frameCount%80===0){
    var banana = createSprite(550,Math.round(random(300,400)),10,10);
    banana.addImage(bananaImage);
    banana.scale=0.15;
    banana.velocityX=-3;
    banana.lifetime=170;
    FoodGroup.add(banana);
  }
}
function spawnObstacles(){
   if (frameCount % 300 === 0){
   var obstacle = createSprite(600,510,10,40);
   obstacle.velocityX=-3;
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.2;
   obstacle.lifetime=190;
   ObstacleGroup.add(obstacle);
  }
}




