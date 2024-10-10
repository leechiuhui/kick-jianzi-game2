const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 圓圈的屬性
let circle1 = {
    x: 150,
    y: 200,
    radius: 30,
    color: 'yellow',
    isPulling: false,
    dx: 0
};

let circle2 = {
    x: 400,
    y: 200,
    radius: 30,
    color: 'red'
};

let hand = {
    x1: circle1.x + circle1.radius,
    y1: circle1.y,
    x2: circle2.x - circle2.radius,
    y2: circle2.y
};

// 畫出圓圈
function drawCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}

// 畫出手的曲線
function drawHand() {
    ctx.beginPath();
    ctx.moveTo(hand.x1, hand.y1);
    ctx.quadraticCurveTo((hand.x1 + hand.x2) / 2, hand.y1 - 50, hand.x2, hand.y2);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// 更新手的位置
function updateHand() {
    hand.x1 = circle1.x + circle1.radius;
    hand.y1 = circle1.y;
    hand.x2 = circle2.x - circle2.radius;
    hand.y2 = circle2.y;
}

// 當圓圈勾住後進行拉扯的動作
function pullAction() {
    let pullDistance = 10; // 拉扯的距離
    let iterations = 3; // 重複動作次數
    let currentIteration = 0;
    
    function pull() {
        if (currentIteration < iterations) {
            // 往右拉
            circle1.dx = pullDistance;
            circle2.dx = pullDistance; // 讓第二個圓圈也跟著移動
            setTimeout(() => {
                // 往左拉
                circle1.dx = -pullDistance;
                circle2.dx = -pullDistance; // 讓第二個圓圈也跟著移動
                setTimeout(() => {
                    // 回到原點
                    circle1.dx = 0;
                    circle2.dx = 0; // 讓第二個圓圈也回到原點
                    currentIteration++;
                    pull(); // 再次執行動作
                }, 500);
            }, 500);
        } else {
            // 結束拉扯動作
            circle1.isPulling = false;
        }
    }
    pull();
}

// 自動移動的速度
let autoMoveSpeed = 2;

// 滑鼠點擊來勾住第二個圓圈
canvas.addEventListener('click', () => {
    if (!circle1.isPulling) {
        // 檢查兩個圓圈是否接觸
        const distance = Math.sqrt(Math.pow(circle2.x - circle1.x, 2) + Math.pow(circle2.y - circle1.y, 2));
        if (distance <= circle1.radius + circle2.radius + 50) { // 加50作為「手」的範圍
            circle1.isPulling = true;
            pullAction();
        }
    }
});

// 遊戲主循環
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 更新位置
    if (circle1.isPulling) {
        circle1.x += circle1.dx;
        circle2.x += circle2.dx; // 更新第二個圓圈的位置
    } else {
        // 自動移動
        circle1.x += autoMoveSpeed;
        circle2.x -= autoMoveSpeed;

        // 碰到邊界反彈
        if (circle1.x + circle1.radius > canvas.width || circle1.x - circle1.radius < 0) {
            autoMoveSpeed = -autoMoveSpeed;
        }
        if (circle2.x + circle2.radius > canvas.width || circle2.x - circle2.radius < 0) {
            autoMoveSpeed = -autoMoveSpeed;
        }
    }

    // 更新並畫出手和圓圈
    updateHand();
    drawHand();
    drawCircle(circle1);
    drawCircle(circle2);

    requestAnimationFrame(update);
}
// 開始遊戲循環
update();

