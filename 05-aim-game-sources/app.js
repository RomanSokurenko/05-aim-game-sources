const startBtn = document.querySelector('#start')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

const screens = document.querySelectorAll('.screen')

let time = 10
let score = 0
const colors = ['blue', 'red', 'white', 'blue', 'red', 'white', 'blue', 'red', 'white', 'blue', 'red', 'white']

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame(time)
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    if (time > 0) {
        setInterval(decreaseTime, 1000)
        setTime(time)
        createRandomCircle()
        console.log("if")
    } else if (time === 0) {
        finishGame()
        console.log('else ',time)
    }
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>`
}

function decreaseTime() {
    // фукнция рендерится каждую секунду.
    if (time === 0) {
        startGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(time) {
    timeEl.innerHTML = `00:${time}`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    circle.classList.add('circle')
    const size = getRandomNumber(15, 50)
    const {width, height} = board.getBoundingClientRect()
    const positionX = getRandomNumber(0, width - size)
    const positionY = getRandomNumber(0, height - size)
    const randColor = Math.floor(Math.random() * colors.length)

    circle.style.top = `${positionY}px`
    circle.style.left = `${positionX}px`
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.background = `linear-gradient(90deg, ${colors[randColor]} 0%, ${colors[randColor + 1]} 47%, ${colors[randColor + 3]} 100%)`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

