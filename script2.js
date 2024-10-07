const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let mario = { x: 350, y: 300, width: 50, height: 50, vy: 0, jumping: false };
let block = { x: 375, y: 200, width: 50, height: 50, hit: false };
let mushroom = { x: 400, y: 200, width: 30, height: 30, visible: false, speed: 2 };
const gravity = 0.5;

// 繪製馬力歐
function drawMario() {
    ctx.fillStyle = "red";
    ctx.fillRect(mario.x, mario.y, mario.width, mario.height);
}

// 繪製磚塊
function drawBlock() {
    ctx.fillStyle = block.hit ? "gray" : "brown";
    ctx.fillRect(block.x, block.y, block.width, block.height);
}

// 繪製蘑菇
function drawMushroom() {
    if (mushroom.visible) {
        ctx.fillStyle = "green";
        ctx.fillRect(mushroom.x, mushroom.y, mushroom.width, mushroom.height);
    }
}

// 更新蘑菇位置
function updateMushroom() {
    if (mushroom.visible) {
        mushroom.x += mushroom.speed;
    }
}

// 檢查碰撞
function checkCollision() {
    if (
        mario.x < block.x + block.width &&
        mario.x + mario.width > block.x &&
        mario.y < block.y + block.height &&
        mario.y + mario.height > block.y
    ) {
        if (mario.jumping) {
            block.hit = true;
            mushroom.visible = true;
        }
    }
}

// 更新馬力歐的跳躍與重力
function updateMario() {
    mario.y += mario.vy;
    mario.vy += gravity;

    if (mario.y + mario.height >= 300) {
        mario.y = 300;
        mario.vy = 0;
        mario.jumping = false;
    }
}

// 處理鍵盤輸入 (跳躍)
window.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !mario.jumping) {
        mario.vy = -10;
        mario.jumping = true;
    }
});

// 遊戲主循環
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 繪製遊戲物件
    drawMario();
    drawBlock();
    drawMushroom();

    // 更新遊戲邏輯
    updateMario();
    updateMushroom();
    checkCollision();

    requestAnimationFrame(gameLoop);
}

// 開始遊戲
gameLoop();
