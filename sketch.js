var ground, groundImg;
var ground2;
var player, playerAnim;
var ghost, ghostAnim, gayab;
var hImg;
var zombieG;
var gameState = "play";
var score = 0;
var appear = false;
var aTime = 0;
var health = 100;
var wait = 180;
var horror;
var hurt;
var hurtV;
var energy = -0.3;

function preload() {
    playerAnim = loadAnimation("Run (2).png", "Run (3).png", "Run (4).png", "Run (5).png", "Run (6).png", "Run (7).png");
    ghostAnim = loadAnimation("vampireW/vampireW (1).png", "vampireW/vampireW (2).png", "vampireW/vampireW (3).png", "vampireW/vampireW (4).png", "vampireW/vampireW (5).png", "vampireW/vampireW (6).png", "vampireW/vampireW (7).png", "vampireW/vampireW (8).png");
    groundImg = loadImage("background1.jpg");
    gayab = loadAnimation("gayab/appear_1.png", "gayab/appear_2.png", "gayab/appear_3.png", "gayab/appear_4.png", "gayab/appear_5.png", "gayab/appear_6.png", "gayab/appear_7.png", "gayab/appear_8.png", "gayab/appear_9.png", "gayab/appear_10.png", "gayab/appear_11.png", "gayab/appear_12.png");
    hImg = loadImage("zombie hand.png");
    horror = loadSound("Evil_Laugh.wav");
    hurt = loadSound("ah.wav");
}

function setup() {

    createCanvas(1600, 1300);

    ground = createSprite(displayWidth / 2, displayHeight / 2.2, 1600, 310);
    ground.addImage("Forest", groundImg);
    ground.scale = 2.8;



    ground2 = createSprite(displayWidth / 2, 1280, 1600, 100);
    ground2.visible = false;

    player = createSprite(480, 1150);
    //player.debug = true;
    player.setCollider("rectangle", 0, 0, 130, 200);

    ghost = createSprite(200, 1100);
    ghost.addAnimation("gayab", gayab);
    ghost.addAnimation("visible", ghostAnim);
    ghost.scale = 0.8;

    zombieG = createGroup();

}

function draw() {

    background(0);

    while (gameState == "play") {
        horror.loop();
    }
    if (gameState == "play") {
        energy++;
        player.addAnimation("Run", playerAnim);
        //calling the functions
        zHand();
        vampire();
        groundC();
        playerM();
        HealthM();

    }


    drawSprites();
    textE();
    scoreH();

    if (gameState == 'end') {
        textSize(50)
        stroke('yellow')
        fill('yellow')
        text('Oh You died!', 650, 650)
        textSize(30)
        stroke('yellow')
        fill('yellow')
        text('Press R to Restart', 650, 700)
        if (keyDown('r')) {
            reset();
        }
    }
}

//vampire
function vampire() {
    wait = wait - 10;

    if (frameCount % 180 == 0) {
        ghost.changeAnimation("gayab", gayab);
    } else {
        ghost.changeAnimation("Chase", ghostAnim);
    }

    //apperance of the vampire
    if (appear == true) {

        ghost.addAnimation("Chase", ghostAnim);
        ghost.visible == true;
    }

    //controls the player visibility	
    if (wait < 200) {

        if (appear == false) {
            ghost.changeAnimation("gayab", gayab);
            aTime += 0.5;
        }

    }

    if (aTime == 23) {
        ghost.visible = false;
    }


}

//z hands
function zHand() {
    if ((frameCount % 120 == 0)) {

        var hand = createSprite(0, 0);
        hand.x = Math.round(random(900, 1500));
        hand.y = random(1200, 1200);
        hand.addImage(hImg);
        hand.scale = 0.4;
        hand.velocityX = energy;
        hand.setCollider("rectangle", 0, 0, 80, 150);
        hand.lifeTime = 800;
        zombieG.add(hand);


    }
}

//ground controls	
function groundC() {

    if (ground.x < 400) {
        ground.x = displayWidth / 2;
    }

    ground.velocityX = energy;
}

//player movements
function playerM() {

    if (keyDown("space")) {
        player.velocityY = -10;
    }

    player.velocityY = player.velocityY + 0.8;

    player.collide(ground2);
}

//text manager
function textE() {

    stroke("yellow");
    fill("blue");
    textSize(20);
    text("Distance: " + score, 1470, 550);

    stroke("white");
    fill("red");
    textSize(20);
    text("Health: " + health, 10, 550);

    stroke("white");
    fill("red");
    textSize(20);
    text("Energy: " + energy, 10, 550);


}

//score manager
function scoreH() {

    if (frameCount % 50 == 0) {
        score += 1
    }

}

function HealthM() {

    if (player.collide(zombieG)) {

        health = health - Math.round(random(5, 10));
        zombieG.destroyEach();
        player.velocityX = 0;
        hurtV = true;
    } else {
        hurtV = false;
    }

    if (health <= 0) {
        gameState = 'end'
        ghost.visible = true;
        ghost.changeAnimation()
    }

    while (hurtV == true) {
        hurt.loop();
    }


}

function reset() {
    zHand();
    vampire();
    groundC();
    playerM();
    HealthM();
    score = 0;
    health = 0;
    wait = 180;
    player.addAnimation("Run", playerAnim);
}
