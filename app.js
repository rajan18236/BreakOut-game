
const displayScore = document.querySelector("#score")
const blocks = document.querySelector(".blocks");
const blockWidth = 60;
const blockHeight = 40;
const startPoint = [600, 50]
let currentPosition = startPoint
const ballStartPoint = [600, 65]
let ballcurrentPosition = ballStartPoint
let xdir = 2
let ydir = 2
let ballDimeter = 25
let timer

class grid {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

// adding new blocks
const grids = [
    new grid(380, 420),
    new grid(455, 420),
    new grid(530, 420),
    new grid(604, 420),
    new grid(679, 420),
    new grid(754, 420),
    new grid(827, 420),
    new grid(380, 365),
    new grid(455, 365),
    new grid(530, 365),
    new grid(604, 365),
    new grid(679, 365),
    new grid(754, 365),
    new grid(827, 365),
    new grid(380, 310),
    new grid(455, 310),
    new grid(530, 310),
    new grid(604, 310),
    new grid(679, 310),
    new grid(754, 310),
    new grid(827, 310),
    new grid(380, 255),
    new grid(455, 255),
    new grid(530, 255),
    new grid(604, 255),
    new grid(679, 255),
    new grid(754, 255),
    new grid(827, 255)
]

// change Direction
const changeDirection = () => {
    if (xdir === 2 && ydir === 2) {
        xdir = -2
    }
    else if (xdir === -2 && ydir === 2) {
        ydir = -2
    }
    else if (xdir === -2 && ydir === -2) {
        xdir = 2
    }
    else if (xdir === 2 && ydir === -2) {
        ydir = 2
    }
}
// collisions check
const checkCollision = () => {

    // collision for wall
    if ((ballcurrentPosition[0] > 870) || (ballcurrentPosition[0] < 380) || (ballcurrentPosition[1] > 450)) {
        changeDirection()
    }
    // collision on floor(game-over)
    else if (ballcurrentPosition[1] < 50) {
        clearInterval(timer)
        document.removeEventListener("keydown", moveHandle)
        displayScore.innerHTML = "Game-Over"
        
    }
    // collision on handle
    if (
        ((ballcurrentPosition[0] < currentPosition[0] + 100 && ballcurrentPosition[0] > currentPosition[0]) && (ballcurrentPosition[1] < currentPosition[1] + 15 && ballcurrentPosition[1] > currentPosition[1]))
    ) {
        changeDirection()
    }

    // collision for blocks
    for (i = 0; i < grids.length; i++) {
        if ((ballcurrentPosition[0] >= grids[i].bottomLeft[0] && ballcurrentPosition[0] <= grids[i].bottomRight[0]) &&
            ((ballcurrentPosition[1] + ballDimeter) >= grids[i].bottomLeft[1] && ballcurrentPosition[1] <= grids[i].topLeft[1])) {
            const allBlocks = Array.from(document.querySelectorAll(".blocks"));
            allBlocks[i].classList.remove("blocks")
            grids.splice(i, 1)
            changeDirection()
            score++;
            displayScore.textContent = score;
        }
    }
}

// ball movement
const moveBall = () => {
    ballcurrentPosition[0] += xdir;
    ballcurrentPosition[1] += ydir;
    ball.style.left = ballcurrentPosition[0] + "px"
    ball.style.bottom = ballcurrentPosition[1] + "px"
    checkCollision()
}

// draw ball
const ball = document.createElement('div')
ball.classList.add("ball")
ball.style.left = ballcurrentPosition[0] + "px"
ball.style.bottom = ballcurrentPosition[1] + "px"
blocks.appendChild(ball);

// draw user handle
const user = () => {
    userHandle.style.left = currentPosition[0] + "px"
    userHandle.style.bottom = currentPosition[1] + "px"
}
const userHandle = document.createElement("div")
userHandle.classList.add("user")
user()
blocks.appendChild(userHandle)

// moving user handle
const moveHandle = (e) => {
    switch (e.key) {
        case "ArrowLeft":
            if (currentPosition[0] > 380) {
                currentPosition[0] -= 10
                user()
            }
            break;
        case "ArrowRight":
            if (currentPosition[0] < 800) {
                currentPosition[0] += 10
                user()
            }
            break;
    }
}

// draw blocks
const displayBlocks = () => {
    for (let i = 0; i < grids.length; i++) {
        let block = document.createElement("div")
        block.classList.add("block")
        blocks.appendChild(block)
        block.style.left = grids[i].bottomLeft[0] + "px"
        block.style.bottom = grids[i].bottomLeft[1] + "px"

    }
    user()

}
// timer
timer = setInterval(moveBall, 20);

document.addEventListener("keydown", moveHandle)
displayBlocks()

