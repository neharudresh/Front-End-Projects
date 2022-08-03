
let running = false
let level = 1
let click = 0
let userString = ""
let expString = ""
let title = document.body.querySelector("#level-title")
let buttons = document.body.querySelectorAll(".btn")
let buttonsValues = Object.values(buttons)
let body = document.getElementsByTagName('body')[0]

buttons.forEach(button => {
    button.addEventListener("click", function() {
        click++
        animateButtonPress(this)
        let clickedButtonIndex = buttonsValues.indexOf(this)
        userString += clickedButtonIndex
        playAudio(this.classList[1])
        checkAnswer()
    })
});

document.addEventListener("keydown", startGame)

function startGame() {
    if(!running)
    {
        title.textContent = `Level ${level}`
        setTimeout(generateSequence, 1000)
        running = true   
    }
}

function generateSequence() {
    randomButtonIndex = Math.floor(Math.random() * 4)
    randomButton = buttons[randomButtonIndex]
    expString += randomButtonIndex
    fadeOutEffect(randomButton)
}

function fadeOutEffect(button) {
    button.style.opacity = 0;
    setInterval(() => {button.style.opacity = 1}, 200);
    playAudio(button.classList[1])
}

function animateButtonPress(button) {
    button.classList.add("pressed")
    setTimeout(function() {button.classList.remove("pressed")}, 100)
}

function checkAnswer() {
    if (userString.slice(-1) == expString[click-1]) {
        if (userString.length == expString.length) {
            level++
            userString = ""
            click = 0
            title.textContent = `Level ${level}`
            setTimeout(generateSequence, 1000)
        }
    }
    else {
        title.textContent = `Game Over, Press Any Key to Restart`
        body.classList.add("game-over")
        setTimeout(function() {body.classList.remove("game-over")}, 100)
        playAudio("wrong")
        restartGame()
    }
} 

function playAudio(color) {
    switch(color) {
        case "red": 
            let redAudio = new Audio("sounds/red.mp3")
            redAudio.play()
            break
        case "green": 
            let greenAudio = new Audio("sounds/green.mp3")
            greenAudio.play()
            break
        case "blue": 
            let blueAudio = new Audio("sounds/blue.mp3")
            blueAudio.play()
            break
        case "yellow": 
            let yellowAudio = new Audio("sounds/yellow.mp3")
            yellowAudio.play()
            break
        case "wrong":
            let wrongAudio = new Audio("sounds/wrong.mp3")
            wrongAudio.play()
            break
        default:
            break
    }
}

function restartGame() {
    running = false
    level = 1
    userString = ""
    expString = ""
    click = 0
}