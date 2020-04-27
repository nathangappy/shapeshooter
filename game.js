// game object
let game = {
  color: 0,
}

// player object
let shooter = new addShooter(30, 'black', window.innerWidth / 2, window.innerHeight - 100)


// start game function
function startGame() {
  resizeCanvas();
  shooter.update()
  setInterval(() => {
    createTarget();
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
    height: 50,
    width: 50,
    color: getColor(),
    x: Math.floor(Math.random() * ((w - 40) - (40) + 1)) + 40,
    y: Math.floor(Math.random() * ((h - 500) - (40) + 1)) + 40,
  };
  addElement(target);
  return target;
}

// add box to page
function addElement(target) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.arc(target.x, target.y, 30, 0, 2 * Math.PI);
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
        this.x -= 5;
        break;
      case 'right':
        this.x += 5;
        break;
    }
    this.update()
  }
  // function for clearing shooter from canvas
  this.clear = function() {
    ctx.clearRect(this.x - 35, this.y - 35, 50 * Math.PI, 50 * Math.PI);
  }
  // function for shooting weapon
  this.shoot = function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    for(let i = this.y - 40; i > 0; i--) {
      ctx.beginPath();
      ctx.arc(this.x, i,  5, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.fill();
      ctx.stroke(); 
      this.clear()
    }
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
    
// resize canvas
function resizeCanvas() {
  let canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('keydown', moveShooter, true)
}
  
// start the game
startGame();
