// game object
let game = {
  score: 0,
  speed: 2000,
  level: 1,
  health: 100,
  color: 0,
  targets: [],
  shots: [],
  destroyed: []
}

// player object
let shooter = new addShooter(30, 'black', window.innerWidth / 2, window.innerHeight - 100)

// start game function
function startGame() {
  let welcome = document.getElementById('welcome');
  welcome.style.display = 'none'
  resizeCanvas();
  shooter.update()
  // add targets & update score
  setInterval(() => {
    scoreUpdate()
    if(game.health <  0) {
      gameOver()
    }
    createTarget();
  }, game.speed);
  // change level
  setInterval(() => {
    damage()
    levelUpdate()
    speed()
    game.level += 1
  }, 10000);
}      

// get next color
function getColor() {
  let colors = ['red', 'blue', 'green', 'orange', 'yellow', 'purple', 'pink'];
  let color = colors[game.color]
  if(game.color < colors.length - 1) {
    game.color += 1
  } else {
    game.color = 0
  }
  return color
}

// create new targets
function createTarget() {
  // screen settings
  w = window.innerWidth
  h = window.innerHeight;

  // target dimensions
  let target = {
    radius: 30,
    color: getColor(),
    x: Math.floor(Math.random() * ((w - 40) - (40) + 1)) + 40,
    y: Math.floor(Math.random() * ((h - 500) - (120) + 1)) + 120,
  };
  addElement(target);
  game.targets.push(target)
  return target;
}

// add targets to page
function addElement(target) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.arc(target.x, target.y, target.radius, 0, 2 * Math.PI);
  ctx.fillStyle = target.color;
  ctx.strokeStyle = target.color;
  ctx.stroke();
  ctx.fill();
  ctx.stroke();
}

// create shooter
function addShooter(size, color, x, y) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  this.x = x;
  this.y = y;
  // function for adding shooter to canvas
  this.update = function() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.fill();
    ctx.stroke();
  }
  // function for moving shooter on canvas
  this.move = function(direction) {
    this.clear()
    switch(direction) {
      case 'left':
        this.x -= 25;
        break;
      case 'right':
        this.x += 25;
        break;
    }
    this.update()
  }
  // function for clearing shooter from canvas
  this.clear = function() {
    ctx.clearRect(this.x - 35, this.y - 35, 30 * Math.PI, 30 * Math.PI);
  }
  // function for shooting weapon
  this.shoot = function async() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let shot = {
      radius: 10,
      y: this.y,
      x: this.x,
    }
    async function bulletLogic(){
      await setInterval(() => {
        game.shots.shift()
        ctx.clearRect(shot.x - 15, shot.y - 65, 10 * Math.PI, 10 * Math.PI);
      }, 100);
      await setInterval(() => { 
        if(shot.y > 0) {
          game.shots.push({x:shot.x, y:shot.y, radius: shot.radius}) 
        }
        ctx.beginPath();
        ctx.arc(shot.x, shot.y - 100,  shot.radius, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.fill();
        ctx.stroke(); 
        collision()
        shot.y-=50
        }, 100);
      } 
    bulletLogic()   
  }
}

// handle keyboard movements for player
function moveShooter(evt) {
  switch(evt.keyCode) {
    case 37:
      shooter.clear(shooter.x, shooter.y)
      shooter.move('left')
      break;
    case 39:
      shooter.clear(shooter.x, shooter.y)
      shooter.move('right')
      break;
    case 32:
      shooter.shoot()
      break;
      }
    }
    
// collision detection
function collision() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  game.targets.forEach(target => {
    game.shots.forEach(shot => {
      let dx = shot.x - target.x;
      let dy = shot.y - target.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < target.radius + shot.radius){
        ctx.clearRect(target.x - 35, target.y - 35, 21 * Math.PI, 21 * Math.PI);
        destroyed(target)
      }
    })
  })
}

// track destroyed targets
function destroyed(target) {
  let idx = game.destroyed.findIndex(idx => idx.x === target.x && idx.y === target.y)
  if(idx === -1){
    game.destroyed.push(target)
    game.score += 10
  }
}

// update score
function scoreUpdate() {
  let score = document.getElementById('score');
  score.innerHTML = 'Score: ' + game.score
}

// update level
function levelUpdate() {
  let level = document.getElementById('level');
  level.innerHTML = 'Level: ' + game.level
}

// health damage
function damage() {
  game.health -= 2 * (game.targets.length - game.destroyed.length)
  let health = document.getElementById('health');
  if(game.health < 0){
    health.innerHTML = 'Health: ' + 0;
  } else {
    health.innerHTML = 'Health: ' + game.health
  }
}

// game speed
function speed() {
  if(game.speed > 100){
    game.speed -= 100
  }
}



function muteAudio() {
  let audio = document.getElementById('audio')
  audio.muted = !audio.muted
  if(audio.muted === true){
    mute.innerHTML = 'Play Audio'
  } else {
    mute.innerHTML = 'Mute Audio'
  }
}

// game over
function gameOver() {
  alert('game over!')
}

// resize canvas
function resizeCanvas() {
  let canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('keydown', moveShooter, true)
}
  
// Event Listeners ------------------------------------------------------
// mute audio button
let mute = document.getElementById('muteButton');
mute.addEventListener('click', muteAudio)

// play game button
let play = document.getElementById('play');
play.addEventListener('click', startGame);