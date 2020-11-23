var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running , monkey_dead ;
var banana ,bananaImage, obstacle, obstacleImage;
var restart , restart_image;
var FoodGroup, obstacleGroup;
var ground;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_dead = loadImage("monkeydead.png");
  restart_image = loadImage("reset.png");
  
}



function setup() {
  
createCanvas(600,200);  
  
monkey = createSprite(75,150,20,20);
monkey.addAnimation("monkey_",monkey_running);
monkey.addImage("dead",monkey_dead);  
monkey.scale = 0.09;  
  
ground = createSprite(300,180,1200,5);  
  
restart = createSprite(325,50,20,20);
restart.addImage("reset_",restart_image);
restart.scale = 0.09    
  
FoodGroup = createGroup();
obstacleGroup = createGroup();    
  
score = 0;  
  
monkey.setCollider("circle",0,0,250) ; 
 
  
}


function draw() {

background("brown")  

stroke("white");
textSize(20)  
fill("white");  
text("Survival Time : "+score , 250, 25); 
  
if (gameState === PLAY){  

restart.visible = false;
    
score = score + Math.round(getFrameRate()/60);  
    
if (keyDown("space") && monkey.y > 75){
  
monkey.velocityY = -10 ;    
  
}

monkey.velocityY = monkey.velocityY + 1 ;            
  
ground.velocityX = -5;
  
if (ground.x < 0){
  
ground.x = ground.width/2;  
  
}
  
monkey.collide(ground);  
  
createFood ();
createObstacles(); 
  
if(FoodGroup.isTouching(monkey)){
  
FoodGroup.destroyEach();  
  
}  
  
  
if(obstacleGroup.isTouching(monkey)){
  
gameState = END;
  
}  
}  
  
else if(gameState === END){

restart.visible = true;  
  
ground.velocityX = 0;
monkey.velocityY = 0;
obstacleGroup.setVelocityXEach(0);
FoodGroup.setVelocityXEach(0);
  
monkey.y = 150;  
monkey.changeImage("dead",monkey_dead);  
monkey.scale = 0.25;  
  
obstacleGroup.setLifetimeEach(-1);
FoodGroup.setLifetimeEach(-1);  
       

if (mousePressedOver(restart)){
  
reset();  
  
}  
  
}  
    
drawSprites();    
  
}

function reset(){
  
gameState = PLAY; 
obstacleGroup.destroyEach();
FoodGroup.destroyEach();
monkey.changeAnimation("monkey_",monkey_running) ;
monkey.scale = 0.09;  
score = 0; 
    
}



function createFood(){

if(frameCount%80 === 0){
  
banana = createSprite(600,Math.round(random(50,115)),20,20); 

banana.addImage("banana_",bananaImage);
banana.scale = 0.08  
  
banana.velocityX = -7;  
  
banana.lifetime = 86
  
FoodGroup.add(banana);  
  
}
  
}

function createObstacles(){

if(frameCount%300 === 0){
  
obstacle = createSprite(600,155,20,20); 

obstacle.addImage("obstacle_",obstacleImage);
obstacle.scale = 0.15  
  
obstacle.velocityX = -7;  
  
obstacle.lifetime = 86
  
obstacle.setCollider("circle",0,0,250)   
  
obstacleGroup.add(obstacle);  
  
}
  
  
}


