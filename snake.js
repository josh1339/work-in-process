const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


const gridSize = 20;
const tileCount = 20;
let snake = [{ x: 10, y: 10 }];
let snakeDirection = { x: 0, y: 0 };  // No movement at start
let food = { x: 15, y: 15 };
let score = 0;
let gameStarted = false; // Track if the game has started


canvas.width = canvas.height = gridSize * tileCount;


function drawGame() {
    // Only move the snake if the game has started
    if (gameStarted) {
        // Calculate the new head position
        const head = { x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y };


        // Check if the snake hits the wall or itself
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            // Game over
            alert('Game Over! Your score: ' + score);
            document.location.reload();
        }


        // Add the new head to the snake
        snake.unshift(head);


        // Check if the snake has eaten the food
        if (head.x === food.x && head.y === food.y) {
            score++;
            // Generate new food at a random location
            food = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount)
            };
        } else {
            // Remove the last segment of the snake (normal movement)
            snake.pop();
        }
    }


    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // Draw the snake
    ctx.fillStyle = 'green';
    for (const segment of snake) {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    }


    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);


    // Run the game loop again
    setTimeout(drawGame, 100);
}


function changeDirection(event) {
    const keyPressed = event.keyCode;


    // Prevent moving in the opposite direction (e.g., can't go left if moving right)
    if (keyPressed === 37 && snakeDirection.x === 0) { // Left arrow
        snakeDirection = { x: -1, y: 0 };
        gameStarted = true; // Start the game on key press
    } else if (keyPressed === 38 && snakeDirection.y === 0) { // Up arrow
        snakeDirection = { x: 0, y: -1 };
        gameStarted = true;
    } else if (keyPressed === 39 && snakeDirection.x === 0) { // Right arrow
        snakeDirection = { x: 1, y: 0 };
        gameStarted = true;
    } else if (keyPressed === 40 && snakeDirection.y === 0) { // Down arrow
        snakeDirection = { x: 0, y: 1 };
        gameStarted = true;
    }
}


document.addEventListener('keydown', changeDirection);


// Initial draw
drawGame();


