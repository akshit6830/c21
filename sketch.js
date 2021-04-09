var canvas;
var music;
var bg  , bubbleColor;
var timer ; 
// loading assets
function preload(){
    music = loadSound("music.mp3");
    hit = loadSound("hit.wav");
    bg = loadImage("bg.jpeg");
    bubbleColor = loadAnimation("bubble.png")
}

// creating sprites
function setup(){
    //drawing canvas 
    canvas = createCanvas(800,400);

    // b means block 
    var bSize = [width/4.4 , 10]
    b1 = createSprite(100,10,bSize[0],bSize[1]);
    b2 = createSprite(300,10,bSize[0],bSize[1]);
    b3 = createSprite(500,10,bSize[0],bSize[1]);
    b4 = createSprite(695,10,bSize[0],bSize[1]);

    // console.log(b1.x , b2.x , b3.x , b4.x)
    
    // main chracter bubble or ball
    ball = createSprite(random(150,width-100), height-20 , 10 , 10);
    ball.setCollider = true;
    
    // setting up some parameters
    ball.velocityY = -2 ; 
    ball.velocityX = random(-1 , -1) ;

    // adding colors
    b1.shapeColor = "red";
    b2.shapeColor = "yellow";
    b3.shapeColor = "blue";
    b4.shapeColor = "green";
    

    ball.addAnimation("bubble" , bubbleColor);
    ball.scale = 1.2 ;
    
    // starting music
    
}
var t = true ;
function draw() {
    timer += 1 ; 
    if (timer == 10){music.play(true);}

    //drawing background image
    background(bg);

    // detecting collisions
    isTouching(ball , b1);
    isTouching(ball , b2);
    isTouching(ball , b3);
    isTouching(ball , b4);

    drawSprites();
}
function isTouching(obj1 , obj2){
    // collision detection
    if (obj1.x - obj2.x < obj2.width/2 + obj1.width/2
        && obj2.x - obj1.x < obj2.width/2 + obj1.width/2
        && obj1.y - obj2.y < obj2.height/2 + obj1.height/2
        && obj2.y - obj1.y < obj2.height/2 + obj1.height/2) 
    {
        // calling the stop function to stop everything
        stop(obj2);
    }
  }

// just a boolean value 
var temp = true;

function stop(obj){
    music.stop();

    if (temp){
        hit.play();
        temp = false;
    }

    ball.velocityY = 0 ; 
    ball.velocityX = 0 ;
    //Creating a Colorfull ball instead of a bubble 
    colorball = createSprite(ball.x , ball.y-5 , 10,10);
    // it should have the same color as the colided object 
    colorball.shapeColor = obj.shapeColor ;

    // detroying the bubble
    ball.destroy();
    
}
