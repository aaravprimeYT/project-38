var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var PLAY=1,END=0,gameState = PLAY;
var gameover,restart,gameoverimage,restartimage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  

  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameoverimage = loadImage("gameOver.png");
  restartimage = loadImage("restart.png");
  
}

function setup() {
  createCanvas(1535,700);
  
  trex = createSprite(0,650,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.6;
  trex.velocityX = 54;
  //trex.debug = true;

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameover = createSprite(0,100,10,10);
  restart = createSprite(0,150,10,10);
  gameover.addImage(gameoverimage);
  restart.addImage(restartimage);
  restart.scale = 0.6;


  spawnObstacles();

  
  ground = createSprite(displayWidth-1450,displayHeight-200,1000000,20);
  ground.addImage("ground",groundImage);
  //ground.debug = true;
  
  invisibleGround = createSprite(displayWidth-1450,displayHeight-200,100000000,10);
  invisibleGround.visible = false;
    
  score = 0;
}

function draw() {
  background(255);
  
  if(gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
    if (ground.x < -2200) {
      ground.width = ground.width/2;
    }
    gameover.x = trex.x + 200;
    restart.x = trex.x + 200;
  if(keyDown("space")&&trex.y>=620){
    trex.velocityY = -15;
  }
  if (ground.x < 0) {
    ground.width = ground.width/2
  }
  trex.velocityX = 4;
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
    ground.x = ground.width/2;
  }

  if(trex.isTouching(obstaclesGroup)){
  gameState = END;
  }
  gameover.visible = false;
  restart.visible = false;
  }
  else if (gameState===END){
  trex.changeAnimation("collided",trex_collided);
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);
  ground.velocityX = 0;
  trex.velocityX = 0;

    restart.visible = true;
    gameover.visible = true;
    trex.velocityY = 0; 
    if(mousePressedOver(restart)){
      reset();
    }

  }
  text("Score: "+ score, trex.x,50);
  camera.x = trex.x+730;
  camera.y = 350;
  //spawnClouds();

  //console.log(gameState);
  console.log(getFrameRate());
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(random(-1860,500),120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.6;
        
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    gameover.depth = trex.depth + 1;
    
    
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {

  for (let i = 1; i < 10; i++) {
    var obstacle = createSprite(300*i,650,10,40);
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    obstacle.scale = 0.6;
    obstacle.lifetime = 800;
    obstaclesGroup.add(obstacle);
    obstacle.depth = trex.depth
    trex.depth = trex.depth + 1;
    restart.depth = trex.depth + 1;
}
  }

function reset(){
gameState = PLAY;
trex.changeAnimation("running",trex_running);
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
score = 0;
spawnObstacles();
}