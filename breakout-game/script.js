const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

// Create ball properties
const ball = {
  // Where it begins
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  // Animation stuff
  speed: 4,
  // The speed of the direction, pixels per render
  dx: 4,
  dy: -4,
};

// Create paddle props
const paddle = {
  // Position the paddle
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

// Draw ball on canvas
function drawBall() {
  // Begin the path
  ctx.beginPath();
  // Create the circle
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  // Create the fill style
  ctx.fillStyle = '#0095dd';
  // Fill the color
  ctx.fill();
  // Close the path
  ctx.closePath();
}

// Draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  // Draw the paddle
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0095dd';
  // Fill the color
  ctx.fill();
  ctx.closePath();
}

// Draw all the things
function draw() {
  drawBall();
  drawPaddle();
  drawScore();
}

// Draw score on canvas
function drawScore() {
  ctx.font = '20px Arial';
  // The text, followed by the coordinates
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

draw();

// Rules and close tab event handlers
rulesBtn.addEventListener('click', () => {
  rules.classList.add('show');
});
closeBtn.addEventListener('click', () => {
  rules.classList.remove('show');
});
