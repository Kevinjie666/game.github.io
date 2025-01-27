// 游戏初始化
const startButton = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const characterSelection = document.getElementById('character-selection');
const gameScreen = document.getElementById('game-screen');
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// 游戏状态
let gameStarted = false;
let selectedCharacter = null;
let characterPosition = { x: 100, y: 300 };  // 默认人物位置
let gravity = 0.5;
let jumpSpeed = -10;
let isJumping = false;

// 角色定义
const characters = {
  李奕渊: { color: 'blue', jumpHeight: 20 },
  杨凯尧: { color: 'white', speed: 5 },
  曹博雄: { color: 'pink', defense: 10 },
  殷章哲: { color: 'black', specialAttack: true }
};

// 游戏界面切换
startButton.addEventListener('click', () => {
  startScreen.classList.add('hidden');
  characterSelection.classList.remove('hidden');
});

// 选择角色
document.querySelectorAll('.character').forEach(character => {
  character.addEventListener('click', (e) => {
    selectedCharacter = e.target.dataset.character;
    characterSelection.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    startGame();
  });
});

// 游戏初始化
function startGame() {
  gameStarted = true;
  canvas.width = 800;
  canvas.height = 600;
  characterPosition.y = 300; // Reset the character to starting position
  gameLoop();
}

// 游戏循环
function gameLoop() {
  if (!gameStarted) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);  // 清除画布

  // 角色跳跃逻辑
  if (isJumping) {
    characterPosition.y += gravity;
  }

  if (characterPosition.y > 300) {
    isJumping = false;
    characterPosition.y = 300;
  }

  drawCharacter();
  requestAnimationFrame(gameLoop);
}

// 绘制角色
function drawCharacter() {
  ctx.beginPath();
  ctx.arc(characterPosition.x, characterPosition.y, 20, 0, Math.PI * 2);
  ctx.fillStyle = characters[selectedCharacter].color;
  ctx.fill();
  ctx.closePath();
}

// 键盘控制
document.addEventListener('keydown', (e) => {
  if (e.key === 'w' && !isJumping) {
    isJumping = true;
  } else if (e.key === 'a') {
    characterPosition.x -= 5;
  } else if (e.key === 'd') {
    characterPosition.x += 5;
  } else if (e.key === 's') {
    // 下蹲动作（暂时不做）
  }
});
