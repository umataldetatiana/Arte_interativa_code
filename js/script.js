// Canvas setup
const canvas = document.getElementById('meuCanvas');
canvas.width = 500; // Define a largura do canvas
canvas.height = 500; // Define a altura do canvas
const ctx = canvas.getContext('2d');
let currentColor = '#39FF14';

// Drawing styles
const lineThickness = 7;
const pointRadius = 5;
const fontSize = '9px Arial'; // Altere este valor para ajustar o tamanho do texto
const gridColor = '#E8E8E8';
const gridSpacing = 50; // Ajuste o espaçamento da grade para se adequar ao novo tamanho do canvas

let drawActions = []; // Armazena todas as ações de desenho

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
    drawActions.push({ type: 'line', startX, startY, endX, endY, color: currentColor }); // Armazena a ação de desenho
}

function drawPoint(centerX, centerY) {
    startPath();
    ctx.arc(centerX, centerY, pointRadius, 0, Math.PI * 2, true);
    ctx.fill();
    drawActions.push({ type: 'point', centerX, centerY, color: currentColor }); // Armazena a ação de desenho
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

function undoLastAction() {
    if (drawActions.length === 0) return; // Verifica se há ações para desfazer

    drawActions.pop(); // Remove a última ação
    clearCanvas(false); // Limpa o canvas sem resetar as ações

    drawActions.forEach(action => {
        ctx.globalCompositeOperation = 'source-over'; // Garante o modo correto de composição
        if (action.type === 'line') {
            setupStroke(action.color);
            drawLine(action.startX, action.startY, action.endX, action.endY);
        } else if (action.type === 'point') {
            setupFill(action.color); // Garante que o preenchimento seja feito com a cor correta
            drawPoint(action.centerX, action.centerY);
        }
    });


}

function clearCanvas(resetActions = true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (resetActions) {
        setupCanvas();
        drawActions = [];
    }
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
document.getElementById('limparCanvas').addEventListener('click', clearCanvas); // Verifique se os IDs dos botões estão corretos
document.getElementById('corVerdeNeon').addEventListener('click', function() {
    changeDrawingColor('#39FF14');
});

document.getElementById('corPinkNeon').addEventListener('click', function() {
    changeDrawingColor('#FF00FF');
});

document.getElementById('corAzulNeon').addEventListener('click', function() {
    changeDrawingColor('#0000FF');
});

document.getElementById('corLaranjaNeon').addEventListener('click', function() {
    changeDrawingColor('#FFA500');
});

// Verifique se o ID do botão está correto
document.getElementById('limparCanvas').addEventListener('click', function() {
    clearCanvas();
});

// Event listener para o botão de desfazer
document.getElementById('desfazerAcao').addEventListener('click', undoLastAction);
// Event listener for the clear button
document.getElementById('limparCanvas').addEventListener('click', clearCanvas);
