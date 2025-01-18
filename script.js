// Criar o canvas dinamicamente
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext('2d');

// Configurações do jogo
const FIELD_COLOR = 'green';
const BALL_RADIUS = 10;
const PLAYER_RADIUS = 20;
const GOAL_WIDTH = 100;
const GOAL_HEIGHT = 200;

// Velocidades
const PLAYER_SPEED = 5;
const BALL_SPEED = 3;

// Estado do jogo
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = Math.random() > 0.5 ? BALL_SPEED : -BALL_SPEED;
let ballDY = Math.random() > 0.5 ? BALL_SPEED : -BALL_SPEED;

let player1X = 100;
let player1Y = canvas.height / 2;
let player2X = canvas.width - 100;
let player2Y = canvas.height / 2;

let player1Up = false;
let player1Down = false;
let player1Left = false;
let player1Right = false;

let player2Up = false;
let player2Down = false;
let player2Left = false;
let player2Right = false;

let score1 = 0;
let score2 = 0;

// Eventos de teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'w') player1Up = true;
  if (e.key === 's') player1Down = true;
  if (e.key === 'a') player1Left = true;
  if (e.key === 'd') player1Right = true;

  if (e.key === 'ArrowUp') player2Up = true;
  if (e.key === 'ArrowDown') player2Down = true;
  if (e.key === 'ArrowLeft') player2Left = true;
  if (e.key === 'ArrowRight') player2Right = true;
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'w') player1Up = false;
  if (e.key === 's') player1Down = false;
  if (e.key === 'a') player1Left = false;
  if (e.key === 'd') player1Right = false;

  if (e.key === 'ArrowUp') player2Up = false;
  if (e.key === 'ArrowDown') player2Down = false;
  if (e.key === 'ArrowLeft') player2Left = false;
  if (e.key === 'ArrowRight') player2Right = false;
});

// Funções de desenho
function drawField() {
  ctx.fillStyle = FIELD_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'white';
  ctx.fillRect(0, (canvas.height - GOAL_HEIGHT) / 2, 10, GOAL_HEIGHT);
  ctx.fillRect(canvas.width - 10, (canvas.height - GOAL_HEIGHT) / 2, 10, GOAL_HEIGHT);

  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
  ctx.stroke();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();
}

function drawPlayers() {
  // Jogador 1
  ctx.beginPath();
  ctx.arc(player1X, player1Y, PLAYER_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();

  // Jogador 2
  ctx.beginPath();
  ctx.arc(player2X, player2Y, PLAYER_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = '30px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText(score1, canvas.width / 4, 50);
  ctx.fillText(score2, (canvas.width * 3) / 4, 50);
}

// Lógica de movimento
function update() {
  // Movimentar os jogadores
  if (player1Up && player1Y - PLAYER_RADIUS > 0) player1Y -= PLAYER_SPEED;
  if (player1Down && player1Y + PLAYER_RADIUS < canvas.height) player1Y += PLAYER_SPEED;
  if (player1Left && player1X - PLAYER_RADIUS > 0) player1X -= PLAYER_SPEED;
  if (player1Right && player1X + PLAYER_RADIUS < canvas.width / 2) player1X += PLAYER_SPEED;

  if (player2Up && player2Y - PLAYER_RADIUS > 0) player2Y -= PLAYER_SPEED;
  if (player2Down && player2Y + PLAYER_RADIUS < canvas.height) player2Y += PLAYER_SPEED;
  if (player2Left && player2X - PLAYER_RADIUS > canvas.width / 2) player2X -= PLAYER_SPEED;
  if (player2Right && player2X + PLAYER_RADIUS < canvas.width) player2X += PLAYER_SPEED;

  // Movimentar a bola
  ballX += ballDX;
  ballY += ballDY;

  // Colisão com as bordas superior e inferior
  if (ballY - BALL_RADIUS < 0 || ballY + BALL_RADIUS > canvas.height) {
    ballDY = -ballDY;
  }

  // Colisão com os jogadores
  if (
    Math.hypot(ballX - player1X, ballY - player1Y) < BALL_RADIUS + PLAYER_RADIUS ||
    Math.hypot(ballX - player2X, ballY - player2Y) < BALL_RADIUS + PLAYER_RADIUS
  ) {
    ballDX = -ballDX;
  }

  // Gol
  if (ballX - BALL_RADIUS < 0 && ballY > (canvas.height - GOAL_HEIGHT) / 2 && ballY < (canvas.height + GOAL_HEIGHT) / 2) {
    score2++;
    resetBall();
  }
  if (ballX + BALL_RADIUS > canvas.width && ballY > (canvas.height - GOAL_HEIGHT) / 2 && ballY < (canvas.height + GOAL_HEIGHT) / 2) {
    score1++;
    resetBall();
  }
}

// Resetar a bola
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballDX = Math.random() > 0.5 ? BALL_SPEED : -BALL_SPEED;
  ballDY = Math.random() > 0.5 ? BALL_SPEED : -BALL_SPEED;
}

// Loop principal
function gameLoop() {
  update();
  drawField();
  drawBall();
  drawPlayers();
  drawScore();
  requestAnimationFrame(gameLoop);
}

// Iniciar o jogo
gameLoop();
