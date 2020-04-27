// start game function
function startGame() {
  resizeCanvas();
  setInterval(() => {
    createBox();
  }, 4000);
}

// array of random colors
let colors = ['red', 'blue', 'green', 'orange', 'yellow', 'purple', 'pink'];

// create a new box
function createBox() {
  // screen settings
  w = window.innerWidth
  h = window.innerHeight;

  // box dimensions
  let box = {
    height: 50,
    width: 50,
    color: colors[Math.floor(Math.random() * colors.length)],
    x: Math.floor(Math.random() * ((w - 40) - (40) + 1)) + 40,
    y: Math.floor(Math.random() * ((h - 500) - (40) + 1)) + 40,
  };
  addElement(box);
  return box;
}

// add element to page
function addElement(box) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.arc(box.x, box.y, 30, 0, 2 * Math.PI);
  ctx.fillStyle = box.color;
  ctx.strokeStyle = box.color;
  ctx.stroke();
  ctx.fill();
  // ctx.fillRect(box.x, box.y, box.height, box.width);
  ctx.stroke();
}

// resize canvas
function resizeCanvas() {
  let canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 200;
}

// start the game
startGame();
