 var checkpoint
 var die
 var jump
 var gameover,gameover_ing
 var restart,restart_ing
 var trex ,trex_running,trex_collide;
 var ground, ground_ing
 var invisible_ground
 var cloud_img
 var ob1
 var ob2
 var ob3
 var ob4
 var ob5
 var ob6
 var score=0
 var gameState=1
 var cactusgroup, cloudgroup
 //1 will be repersenting play gamestate and 0 will repersent endgame

function preload(){


  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  ground_ing=loadImage("ground2.png")
  cloud_img=loadImage("cloud.png")
  ob1=loadImage("obstacle1.png")
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  trex_collide=loadAnimation("trex_collided.png")
  gameover_ing=loadImage("gameOver.png")
  restart_ing=loadImage("restart.png")
  checkpoint=loadSound("checkPoint.mp3")
  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
}

function setup(){


  createCanvas(600,200) 
  //create a trex 
  trex=createSprite(100,100,50,50)
  trex.addAnimation("run",trex_running)
  trex.addAnimation("collided",trex_collide)
  trex.scale=0.5
  ground=createSprite(300,190,600,20)
  ground.addImage(ground_ing)
  invisible_ground=createSprite(300,198,600,20)
  invisible_ground.visible=false
  cactusgroup=createGroup()
  cloudgroup=new Group()
  gameover=createSprite(285,80,20,20)
  restart=createSprite(285,120,20,20)
  gameover.addImage(gameover_ing)
  restart.addImage(restart_ing)
  gameover.scale=0.5
  restart.scale=0.5
  gameover.visible=false
  restart.visible=false
}

function draw(){


  background("pink")
  drawSprites()
  

  trex.collide(invisible_ground)
  //console.log(trex.y)
  //console.log(frameCount)
  
  textSize(18)
  textFont("georgia")
  text("Score: "+ score,490,40)
  if(score%200===0&&score>0){
    checkpoint.play()
  }

  if(gameState===1){
    ground.velocityX=-(2*5+score/100)
    if(ground.x<0){
      ground.x=900
    }
    if(keyDown("space")&&trex.y>160){
      trex.velocityY=-12
      jump.play()
    }
    trex.velocityY=trex.velocityY+0.5 
    score=score+Math.round(getFrameRate()/10)

    clouds()
  //console.log(Math.round(Math.random(50,100)))
    cactus()
    if(trex.isTouching(cactusgroup)){
      gameState=0
      die.play()
    }
  }
  else if(gameState===0){
    ground.velocityX=0
    trex.velocityY=0
    cloudgroup.setVelocityXEach(0)
    cactusgroup.setVelocityXEach(0)
    cactusgroup.setLifetimeEach(-1)
    cloudgroup.setLifetimeEach(-1) 
    gameover.visible=true
    restart.visible=true

    trex.changeAnimation("collided",trex_collide)
    if(mousePressedOver(restart)){
      reset()


    }



   
  }

  

}
function clouds(){
  
  if(frameCount%50===0){
    var cloud 
    cloud=createSprite(680,50,70,70)
    cloud.y=Math.round(random(10,150))
    console.log(cloud.y)
    cloud.addImage(cloud_img)
    cloud.velocityX=-3
    cloud.depth= trex.depth
    trex.depth= trex.depth+1  
    cloud.lifetime=227
    cloudgroup.add(cloud)
  }


}
function cactus(){
  if(frameCount%80===0){
    var cactus
    cactus=createSprite(670,170,20,20)
    cactus.scale=0.65 
    cactus.velocityX=-(2*5+score/100)
    cactus.lifetime=168
    cactusgroup.add(cactus) 
    var choice=Math.round(random(1,6))
    switch(choice){
      case  1:cactus.addImage(ob1);break   
      case  2:cactus.addImage(ob2);break
      case  3:cactus.addImage(ob3);break
      case  4:cactus.addImage(ob4);break   
      case  5:cactus.addImage(ob5);break
      case  6:cactus.addImage(ob6);break
    }
  }
}
function reset(){
    gameState=1
    cactusgroup.destroyEach()
    cloudgroup.destroyEach( )
    gameover.visible=false
    restart.visible=false
    trex.changeAnimation("run",trex_running)
    score=0
}