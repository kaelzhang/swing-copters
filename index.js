'use strict';

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'swing-copters', {
  preload: preload,
  create: create,
  update: update,
  render: render
});

function preload() {
  game.load.image('background', require.resolve('./src/bg.png'));
  game.load.spritesheet('dude', require.resolve('./src/dude.png'), 32, 48, 9);

}

var background;
var dude;
var r = true;
function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);

  //  The scrolling background
  background = game.add.tileSprite(0, 0, 800, 600, 'background');
  dude = game.add.sprite(400, 300, 'dude', 5);
  dude.scale.set(5);

  game.physics.enable(dude, Phaser.Physics.ARCADE);
  // dude.body.allowRotation = false;
  dude.animations.add('walk').play(10, true);
  // game.add.tween(dude).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
  dude.anchor.setTo(0.5, -0.5);

  var flag;
  game.input.onTap.add(function () {
    r = !r;
  }); 
}


var max_angular_v = 200;
var max_angle = 90;
var clockwise = true;
function update() {

  //  Scroll the background
  background.tilePosition.y += 2;

  var angle = dude.body.rotation;
  var minus = Math.cos(angle * Math.PI / 180) - Math.cos(max_angle * Math.PI / 180);
  
  if (clockwise && angle >= 90) {
    clockwise = false
  } else if (!clockwise && angle <= -90) {
    clockwise = true;
  }

  var n = clockwise
    ? 1
    : -1;

  var v = n * max_angular_v * Math.sqrt( Math.abs(minus));
  dude.body.angularVelocity = v;
}

function render() {
}



function restart() {

  //  A new level starts

  //resets the life count
  lives.callAll('revive');
  //  And brings the aliens back from the dead :)
  aliens.removeAll();
  createAliens();

  //revives the player
  player.revive();
  //hides the text
  stateText.visible = false;

}