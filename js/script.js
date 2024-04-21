/**
 * Este script é usado para desenhar em um elemento canvas HTML.
 */

// Obtém o elemento canvas do DOM e o contexto de desenho
const canvas = document.getElementById('meuCanvas');
const ctx = canvas.getContext('2d');

// Define a cor atual para desenho
let currentColor = 'red'; // Cor inicial

/**
 * Desenha uma linha entre dois pontos.
 *
 * @param {number} x1 - A coordenada x do ponto inicial.
 * @param {number} y1 - A coordenada y do ponto inicial.
 * @param {number} x2 - A coordenada x do ponto final.
 * @param {number} y2 - A coordenada y do ponto final.
 * @param {string} color - A cor da linha. Se não for fornecida, a cor atual será usada.
 */
function drawLine(x1, y1, x2, y2, color = currentColor) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

/**
 * Inicializa o quadro com linhas de grade.
 *
 * @param {number} spacing - O espaçamento entre as linhas da grade. Se não for fornecido, o padrão será 50.
 */
function initGrid(spacing = 50) {
    ctx.strokeStyle = '#E8E8E8'; // Cor suave para a grade
    for (let x = 0; x <= canvas.width; x += spacing) {
        drawLine(x, 0, x, canvas.height);
    }
    for (let y = 0; y <= canvas.height; y += spacing) {
        drawLine(0, y, canvas.width, y);
    }
}

/**
 * Desenha um ponto em uma posição específica.
 *
 * @param {number} x - A coordenada x do ponto.
 * @param {number} y - A coordenada y do ponto.
 * @param {string} color - A cor do ponto. Se não for fornecida, a cor atual será usada.
 */
function drawPoint(x, y, color = currentColor) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2, true);
    ctx.fill();
}

/**
 * Configura a interatividade do mouse com o canvas.
 * Quando o botão do mouse é pressionado, começa a desenhar.
 * Quando o botão do mouse é solto, para de desenhar.
 * Quando o mouse se move, desenha uma linha para a nova posição do mouse.
 */
function setupInteraction() {
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        lastX = e.offsetX;
        lastY = e.offsetY;
        drawPoint(lastX, lastY); // Desenha um ponto inicial
    });
    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) {
            drawLine(lastX, lastY, e.offsetX, e.offsetY);
            lastX = e.offsetX;
            lastY = e.offsetY;
        }
    });
    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });
}

/**
 * Muda a cor atual para desenho.
 *
 * @param {string} newColor - A nova cor para desenho.
 */
function changeColor(newColor) {
    currentColor = newColor;
}

// Inicializa a grade e configura a interatividade
initGrid(); // Inicializa a grade
setupInteraction(); // Configura interatividade