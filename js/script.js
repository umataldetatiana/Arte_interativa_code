// Main script for canvas drawing interaction.

// Canvas setup
const canvas = document.getElementById('meuCanvas');
const ctx = canvas.getContext('2d');
let currentColor = '#39FF14';

// Drawing styles
const lineThickness = 7;
const pointRadius = 5;
const fontSize = '10px Arial';
const gridColor = '#E8E8E8';
const gridSpacing = 50;

// Setup stroke style
function setupStroke(color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = lineThickness;
}

// Setup fill style
function setupFill(color) {
    ctx.fillStyle = color;
    ctx.font = fontSize;
}

// Begin drawing path
function startPath() {
    ctx.beginPath();
}

// Drawing functions
function drawLine(startX, startY, endX, endY) {
    startPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

function drawPoint(centerX, centerY) {
    startPath();
    ctx.arc(centerX, centerY, pointRadius, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawGrid(spacing) {
    for (let x = 0; x <= canvas.width; x += spacing) {
        for (let y = 0; y <= canvas.height; y += spacing) {
            drawLine(x, 0, x, canvas.height);
            drawLine(0, y, canvas.width, y);
        }
    }
}

function drawLabels(spacing) {
    ctx.textAlign = 'center';
    for (let x = 0; x <= canvas.width; x += spacing) {
        for (let y = 0; y <= canvas.height; y += spacing) {
            const coordinates = `(${x}, ${y})`;
            const size = `${spacing}x${spacing}`;
            ctx.fillText(coordinates, x + spacing / 2, y + spacing / 2 - 10);
            ctx.fillText(size, x + spacing / 2, y + spacing / 2 + 10);
        }
    }
}

function drawGridSize() {
    const sizeText = `Tamanho: ${canvas.width} x ${canvas.height}`;
    ctx.fillText(sizeText, canvas.width / 2, canvas.height - 10);
}

// Interaction setup
function setupCanvasInteraction() {
    let isDrawing = false;
    let [lastX, lastY] = [0, 0];

    canvas.onmousedown = (e) => {
        [isDrawing, lastX, lastY] = [true, e.offsetX, e.offsetY];
        setupStroke(currentColor);
        drawPoint(lastX, lastY);
    };

    canvas.onmousemove = (e) => {
        if (!isDrawing) return;
        drawLine(lastX, lastY, e.offsetX, e.offsetY);
        [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    canvas.onmouseup = () => isDrawing = false;
}

// Change the drawing color
function changeDrawingColor(newColor) {
    currentColor = newColor;
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setupCanvas();
}

// Initial setup
function setupCanvas() {
    setupStroke(gridColor);
    drawGrid(gridSpacing);
    setupFill('black');
    drawLabels(gridSpacing);
}

setupCanvas();
setupCanvasInteraction();

// Event listener for the clear button
document.getElementById('limparCanvas').addEventListener('click', clearCanvas);