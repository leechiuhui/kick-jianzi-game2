const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 初始化毽子變數
let jianzi = {
    x: canvas.width / 2,
    y: canvas.height - 60,
    radius: 20,
    dy: 2,  // 垂直速度
    gravity: 0.5,  // 重力
    lift: -8,  // 踢起的力量
};

// 監聽滑鼠點擊事件來踢毽子
canvas.addEventListener('mousedown', kickJianzi);

// 踢毽子
function kickJianzi() {
    jianzi.dy = jianzi.lift;  // 上升
}

// 更新遊戲狀態
function update() {
    // 清空畫布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 繪製毽子
    ctx.beginPath();
    ctx.arc(jianzi.x, jianzi.y, jianzi.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();

    // 重力影響下墜
    jianzi.dy += jianzi.gravity;
    jianzi.y += jianzi.dy;

    // 防止毽子掉出下邊界，並模擬反彈效果
    if (jianzi.y + jianzi.radius > canvas.height) {
        jianzi.y = canvas.height - jianzi.radius;
        jianzi.dy = 0;  // 停止下落
    }

    // 防止毽子飛出上邊界
    if (jianzi.y - jianzi.radius < 0) {
        jianzi.y = jianzi.radius;
        jianzi.dy = 0;
    }

    requestAnimationFrame(update);  // 繼續更新遊戲
}

// 開始遊戲循環
update();
