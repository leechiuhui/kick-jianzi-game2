const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");

let drawing = false;

// 設定畫筆的基本屬性
ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.strokeStyle = "#8B4513"; // 樹幹顏色

// 追蹤滑鼠的位置
function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// 畫樹幹
function drawTrunk(x, y) {
    ctx.strokeStyle = "#8B4513"; // 樹幹顏色
    ctx.lineTo(x, y);
    ctx.stroke();
}

// 畫樹葉
function drawLeaves(x, y) {
    ctx.strokeStyle = "#228B22"; // 樹葉顏色
    ctx.lineTo(x, y);
    ctx.stroke();
}

// 開始畫
canvas.addEventListener("mousedown", (evt) => {
    drawing = true;
    const pos = getMousePos(canvas, evt);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
});

// 停止畫
canvas.addEventListener("mouseup", () => {
    drawing = false;
});

// 畫樹
canvas.addEventListener("mousemove", (evt) => {
    if (!drawing) return;

    const pos = getMousePos(canvas, evt);
    
    // 根據 y 座標決定畫樹幹還是樹葉
    if (pos.y > canvas.height / 2) {
        drawTrunk(pos.x, pos.y);
    } else {
        drawLeaves(pos.x, pos.y);
    }
});

// 清除畫布（重設遊戲）
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 按下C鍵重設畫布
window.addEventListener("keydown", (evt) => {
    if (evt.key === "c") {
        clearCanvas();
    }
});
