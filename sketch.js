//The following line states the Version Number of this project.
let version = "randomLeaf-preloadText-debug";
/** CREDITS!!11
 * Music From:
 
 * https://www.bensound.com/royalty-free-music/track/the-elevator-bossa-nova
 * By Benjamin Tissot, AKA Bensound.
 * 
 * Fun fact: I only discovered this track very recently...
 * ..after having listened to it on YouTube for FOUR years,
 * having wondered where on the WEB(GL) I could find it!
 *
 *
 * Leaf Clipart From:
 * https://pngio.com/images/png-a732143.html
 *
 * Really helped me! Originally I was going for a version
 * of this I found on Google images (although I found this
 * as well only through Google images, ..xD!!!) SOLD on
 * Shutterstock. After having edited that version with my
 * broken screen for an hour....I realized that it was
 * paid. Facepalm moment. This one was a good clone, though
 * it had less images (Shutterstock: 4 x 4, this: 3 x 2: 
 * grid of images.)
 * 
 * Apple Clipart from:
 * https://cdn.assets.scratch.mit.edu/internalapi/asset/3826a4091a33e4d26f87a2fac7cf796b.svg/get/
 *
 * I have used Scratch for pretty much all my life whenever I want 
 * ready-made assets. This was one of them. Although I had software
 * to open .svg files, I chose to screenshot it instead....yeah.
 *
 * For sound effects, I'll use Scratch (Have I even used it this way 
 * outside a Scratch project!?) and Freesound.org (Most used) like I
 * do, although code.org had a more 'defined'/limited....simply put,
 * easy to search through library with most of the sounds I would
 * actually really need, so I'll consider that as a source in the 
 * future too! ..although of course Freesound is much better. xD.
 *
 */

//Game code, finally!

var garden, rabbit; //Pre-written code...I don't care, :P!
var gardenImg, rabbitImg; //....................same thing.
let score = 0,
  maxTime = 0.00;

let load, musLN; //"Loading" text :P

function preload() {
  World.frameRate = 60; //p5.play, just SET the frameRate to 60, WHY do you avoid p5's data SO much!? It took me so long to get this syntax correct in the correct place. p5.play, I HATE YOU! ...ok sorry I actually like you too.
  frameRate(60); //Ok, dear p5, let the frameRate = 60! :D!

  load = createP("Please check your internet if this takes too long..\n....or refresh the page.");
  load.position(65, -16);
  gardenImg = loadImage("garden.png"); //Don't mind me, just loading in a "small" image. This image inspired "the creator" to put some music he finally found after 4 years of listening to it and wondering where he could get a copy and blah blah blah blah.
  load.html(" 1/5(Garden Image)");
  rabbitImg = loadImage("rabbit.png"); //Don't mind me either! Just loading in another "small" image. xD. It's a really cute and white rabbit, Awww!
  load.html(" 2/5(Rabbit Image)");
  appleImg = loadImage("addedAssets/stolenAppleSpriteFromScratch_xD.png"); //So we feed apples instead of carrots to rabbits now..?
  load.html(" 3/5(Apple Image)");
  //Also WHAT is THIS:
  // https://curriculum.whitehatjr.com/Project+HTML/PRO/Pro+C11b/15.png
  music = loadSound("addedAssets/bensound-theelevatorbossanova - 3MB.mp3"); //The sweet music that takes a bitterly long time to load. -_-

  musLN = createA("https://www.bensound.com/royalty-free-music/track/the-elevator-bossa-nova", "\"The elevator Bossa Nova\"", "_blank");
  musLN.position(135, 0);
  load.html(" 4/5 Music: ");
  let load2 = createP(" - by Benjamin Tissot, AKA Bensound.");
  load2.position(135, 8);

  music.setVolume(0.125); //Making sure the sweet music is sweet! :P

  //Leaves -_-
  {
    load2.remove();
    musLN.remove();
    load.html("Loading leaf images...");
    l1 = loadImage("addedAssets/leaves/1.png");
    load.html("Loading leaf images... 1/6");
    l2 = loadImage("addedAssets/leaves/2.png");
    load.html("Loading leaf images... 2/6");
    l3 = loadImage("addedAssets/leaves/3.png");
    load.html("Loading leaf images... 3/6");
    l4 = loadImage("addedAssets/leaves/4.png");
    load.html("Loading leaf images... 4/6");
    l5 = loadImage("addedAssets/leaves/5.png");
    load.html("Loading leaf images... 5/6");
    l6 = loadImage("addedAssets/leaves/6.png");
  }
  //Eating SoundFX
  {
    load.html("Loading Minecraft Eating sounds...");
    e1 = loadSound("addedAssets/eat_snd/mc_eat1.mp3");
    load.html("Loading Minecraft Eating sounds... 1/4");
    e2 = loadSound("addedAssets/eat_snd/mc_eat2.mp3");
    load.html("Loading Minecraft Eating sounds... 2/2");
    e3 = loadSound("addedAssets/eat_snd/mc_eat3.mp3");
    load.html("Loading Minecraft Eating sounds... 3/4");
    e4 = loadSound("addedAssets/eat_snd/mc_eat4.mp3");


    e1.setVolume((0.09) / 3);
    e2.setVolume((0.15) / 3);
    e3.setVolume((0.20) / 3);
    e4.setVolume((0.04) / 3);
  }

  load.html("Loading Sketch!");
}

function setup() {
  load.remove();
  createCanvas(400, 400).position(windowWidth / 2 - 200, windowHeight / 2 - 200); //Of course you do that!
  music.play(); // :D
  fill(0);

  // "Moving" background
  garden = createSprite(200, 200);
  garden.addImage(gardenImg);
  //The assets look good, I might as well download them for personal use :P

  //Creating RABBIT "running"
  rabbit = createSprite(180, 340, 30, 30);
  rabbit.scale = 0.09;
  rabbit.addImage(rabbitImg);

  rockEdge = createSprite(307, 400, 20, 10);
  //I want this cute rabbit to slip off of the cute rock in the cute scenery. Cute detail. I should stop using that word. ew.
  rockEdge.rotation = -31; //Physicc!!1

  rockEdge.visible = false; //Making sure we hide it for the players ;)

  //Leaves. Again.
  leaf = createSprite(-random(150, 250), -random(7, 15));
  leaf.velocityY = random(2, 2.4);
  leaf.rotateToDirection = true;
  leaf.scale = 0.25; { //   _
    leaf.addAnimation("1", l1); //Pain.\
    leaf.addAnimation("2", l2); //Pain..\
    leaf.addAnimation("3", l3); //Pain...\
    leaf.addAnimation("4", l4); //Pain....\
    leaf.addAnimation("5", l5); //Pain.....\
    leaf.addAnimation("6", l6); //Pain______\ <-- Right◢!!! :D!
  }

  //Apple(s) :D
  apple = createSprite(200, -50);
  //createSprite(-random(150, 250), -random(7, 15));
  apple.addImage(appleImg);
  apple.velocityY = 2.25;
  apple.scale = 0.5;

  edges = createEdgeSprites(); //So the rabbit has collision.

  //Depths:
  leaf.depth = rabbit.depth - 1;
  rabbit.x = pmouseX;
  maxTime = getItem('maxTime');
  x = mouseX;
  y = mouseY;
}

let x = 0,
  y = 0;

function draw() { //So apparently this part loops. I'll have to stop these comments for performance, -_- ; - ;)!
  if (music.isPlaying() == false)
    music.play();
  // console.log(getItem('highScore'));
  background(0);
  handleRabbit();

  createLeaves();
  createApples();
  drawSprites();
  if (millis() < 11000 && millis() > 1000) {
    textStyle(BOLDITALIC);
    text("Press space to reveal anonymous data!\n(And hold down control if it is unreadable.)", 90, 80);

    // rect(0, 85, 395, textSize(), 20, 20, 20, 20);
    // fill(255, 84, 101);
    // text("\nOn mobile devices, please touch the part of the screen above this text.", 0, 80);
    // fill(0);
  }
  if (keyIsDown(32)) {
    if (keyIsDown(17)) {
      fill(155);
      rect(140, 100, 250, 130);
      fill(0);
    }
    textStyle(NORMAL);
    textStyle(BOLD);
    text("\n\t\t\t\"CalmGame\" \nVersion: " + version, 150, 100);
    text("\n\n\n\t\t\t\t\Score: " + score, 150, 100);
    text("\n\n\n\n\t\t\tHighscore: " + getItem('highScore') + "\n (On this device only!)", 150, 100);
    text("\n\n\n\n\n\n\t\t\tMaxTimeSpentPlaying: " + getItem('maxTime') / 1000, 150, 100);
    text("\n\n\n\n\n\n\nPress Shift for debug info.\n Ctrl for easier reading.", 150, 100);
    if (keyIsDown(16)) {
      rockEdge.debug = true;
      rockEdge.visible = true;
      rabbit.debug = true;
      apple.debug = true;
      leaf.debug = true;

      if (keyIsDown(88)) {
        fill(155);
        // blendMode(EXCLUSION);
        rect(140, 230, 230, 60);
        // blendMode(BLEND);
        fill(0);
      }
      text("\n\n\n\n\n\n\n\nPress \'X\' for easier reading.", 150, 130);
      text("\n\n\n\n\n\n\n\n\nTime: " + (millis() / 1000), 150, 130);
      text("\n\n\n\n\n\n\n\n\n\nFPS: " + frameRate(), 150, 130);
      // blendMode(EXCLUSION);
      if (keyIsDown(88)) {
        if (mouseX < 313 && mouseX > 37) x = mouseX;
        if (mouseY < 368 && mouseY > 32) y = mouseY;
        fill(155);
        rect(x + 15, y - 12, 37, 32);
        fill(0);
      }
      text("x:" + mouseX + "\nY: " + mouseY, x + 15, y);
      // blendMode(BLEND);
    }
  }
  if (!keyIsDown(88)) {
    rockEdge.debug = false;
    rockEdge.visible = false;
    rabbit.debug = false;
    apple.debug = false;
    leaf.debug = false;
  }

  if (maxTime < millis()) storeItem('maxTime', millis());
  rabbit.y = 340;
}

function handleRabbit() {
  rabbit.collide(edges);
  rabbit.bounce(rockEdge);
  // rabbit.velocityY = 99;
  rabbit.x += (pmouseX - rabbit.x) * 0.09;
  //...because sprite.velocityX is useless.
  //Rabbit touches rock at x = 233
  //Rabbit's x range: {84,373}
  if (rabbit.x < 84) rabbit.x = 84
  if (rabbit.x > 373) rabbit.x = 373;
  if (rabbit.x > 347) rabbit.y += rabbit.x - 347;
  if (rabbit.x > 370) rabbit.y = 575;
  if (rabbit.y > 340) rabbit.y = 340;
}


// createLeaves()! It took me two days to make this!!!
function createLeaves() {
  let rot = 0.00; //Max rotation of each leaf.

  if (frameCount % 45 == 0) {
    //Reseed the RNG since it behaves very badly >:/
    randomSeed(Math.round(-random(99, 1), random(0, 99)));
  }
  if (leaf.y > 400) {
    leaf.scale = 0.25;
    leaf.velocityY = random(2, 2.4);
    leaf.x = random(150, 250);
    leaf.changeAnimation(Math.round(random(1, 6)));
    leaf.y = -random(25, 50);
    leaf.velocityX = 0;
  }
  if (leaf.y < 400) {

    if (frameCount % 15 == 0) {
      rot = pmouseX / 0.0715;
      rot = (Math.round(random(-1, 1)) < 0) ? -rot : rot;

      if (leaf.velocityX != rot)
        leaf.velocityX += random(-random(0.5, 0.1),
          random(0.1, 0.5));

    } //End of frameCount comparison
  } //End of y < 400

  if (leaf.y > rabbit.y) {
    if (leaf.scale > 0)
      leaf.scale += (rabbit.y - leaf.y) * 0.00099;
  }
  if (leaf.scale < 0 && leaf.y < ((rabbit.y -
      leaf.height))) {
    leaf.velocityY = 0;
    leaf.y = 410;
  }
  if (leaf.scale < 0.1) leaf.scale = 0;
}

let did = false;

// This function took me two days as well. It was easy.
// ...yet it took so long.
// I definitely wasn't being lazy and 
// not working full time :P
function createApples() {
  if (apple.y > 390) {
    apple.scale = 0.5;
    apple.x = random(84, 373);
    apple.y = -random(25, 50);
    apple.velocityY = 2.25;
  }

  if (apple.y < 50) did = false;

  if (apple.isTouching(rabbit)) {
    if (did == false) callScore();

    if (apple.scale > 0 && apple.y < 400) {
      apple.scale -= 0.05;
      // (rabbit.y - apple.y + 25) * 0.0005;
    }
  }
  if (apple.scale < 0.1) apple.scale = 0;
  if (apple.y > 385 && apple.scale > 0) apple.scale -= 0.125;

} //End of createApples()

function callScore() {
  let m = Math.round(random(1, 4));
  score++;
  if (score > getItem('highScore'))
    storeItem('highScore', score);
  // ['e' + Math.round(random(1, 4)).toString()].play();
  switch (m) {
    case 1:
      e1.play();
      break;
    case 2:
      e2.play();
      break;
    case 3:
      e3.play();
      break;
    case 4:
      e4.play();
      break;
  }

  did = true;
}

//End of code..? Yay! :D!
