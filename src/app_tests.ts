
// Copy a png image as 'images/cat.png'
import * as PIXI from 'pixi.js';
// import { Application, } from 'pixi.js'
import Keyboard from 'pixi.js-keyboard';
import Mouse from 'pixi.js-mouse';

//Aliases
let loader = PIXI.Loader.shared;
let resources = PIXI.Loader.shared.resources;

//Create a Pixi Application
let app = new PIXI.Application({
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  // antialiasing: true, 
  transparent: false,
  resolution: 1
});

window.addEventListener("resize", function () {
  app.renderer.resize(window.innerWidth, window.innerHeight);
});

app.view.addEventListener('contextmenu', (e) => {
  // window.wasRightClick = true;
  //e.preventDefault();
});

//Add the canvas that Pixi automatically created for you to the HTML document
app.view.id = 'main';
document.body.appendChild(app.view);

//Use Pixi's built-in `loader` module to load an image
loader
  .add(["assets/bunny.png"])
  // .onProgress(loadProgressHandler)
  // .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler(loader, resource) {
  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url);
  //Display the precentage of files currently loaded
  console.log("progress: " + loader.progress + "%");
}

var cat, state;

function rotateToPoint(mx, my, px, py) {
  // var self = this;
  var dist_Y = my - py;
  var dist_X = mx - px;
  var angle = Math.atan2(dist_Y, dist_X);
  //var degrees = angle * 180/ Math.PI;
  return angle;
}

function setup() {
  console.log("setup");

  //Create the `cat` sprite 

  cat = new PIXI.Sprite(resources["assets/bunny.png"].texture);
  cat.position.set(100, 100);
  cat.anchor.set(0.5, 0.5);
  app.stage.addChild(cat);

  //Set the game state
  state = play;

  //Start the game loop 
  app.ticker.add(delta => gameLoop(delta));
  console.log("Mouse", Mouse);
  console.log("Keyboard", Keyboard);

  Mouse.events.on('released', null, (buttonCode, event, mouseX, mouseY, mouseOriginX, mouseOriginY, mouseMoveX, mouseMoveY) => {
    console.log(buttonCode, mouseOriginX, mouseOriginY, mouseX, mouseY, mouseMoveX, mouseMoveY);
  });
}

function gameLoop(delta) {
  //Update the current game state:
  state(delta);

  Keyboard.update();
  Mouse.update();
}

function play(delta) {
  console.log("play");

  const speed = 5 * delta;

  if (Keyboard.isKeyDown('ArrowLeft', 'KeyA'))
    cat.x -= speed;
  if (Keyboard.isKeyDown('ArrowRight', 'KeyD'))
    cat.x += speed;

  if (Keyboard.isKeyDown('ArrowUp', 'KeyW'))
    cat.y -= speed;
  if (Keyboard.isKeyDown('ArrowDown', 'KeyS'))
    cat.y += speed;

  if (Mouse.isButtonDown(Mouse.Button.LEFT))
    cat.x -= speed;
  if (Mouse.isButtonDown(Mouse.Button.RIGHT))
    cat.x += speed;
  if (Mouse.isButtonDown(Mouse.Button.MIDDLE))
    cat.y += speed;

  cat.rotation = rotateToPoint(Mouse.getPosX(), Mouse.getPosY(), cat.x, cat.y);
}