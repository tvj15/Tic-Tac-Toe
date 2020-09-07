const cells = [...document.getElementsByClassName('cell')]
const endScreen = document.getElementsByClassName('end-screen')[0]
const restartButon = document.getElementById('restart-button')

const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let clicks = 0
let gameEnd = false
let player = 'human'
let currShape = 'X'

cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        if (cell.innerText === '') {
            cell.innerText = currShape
            clicks += 1
            gameLoop()
            if (!gameEnd) {
                setTimeout(() => {
                    aiPlay()
                }, 500);
            }
        }
    })
})

restartButon.addEventListener('click', () => {
    resetGame()
})

const gameLoop = () => {
    if (checkWin() !== null) {
        endGame(checkWin())
    } else if (clicks === 9) {
        endGame()
    }
    changeShape()
}

const aiPlay = () => {
    availableCell = availPlace()
    if (availableCell.length !== 0) {
        availableCell[Math.floor(Math.random() * availableCell.length)].innerText = currShape
        clicks += 1
        gameLoop()
    }
}

const changeShape = () => {
    if (currShape === 'X') {
        currShape = 'O'
    } else {
        currShape = 'X'
    }
}

const checkWin = () => {
    let winner = null
    combinations.forEach((arr) => {
        if (cells[arr[0]].innerText === currShape && cells[arr[1]].innerText === currShape && cells[arr[2]].innerText === currShape) {
            winner = currShape
        }
    })
    return winner
}


const endGame = (shape) => {
    gameEnd = true
    if (shape) {
        endScreen.firstElementChild.innerText = shape + '  WINS !!!'
    } else {
        endScreen.firstElementChild.innerText = 'IT\'S A DRAW.'
    }

    endScreen.classList.add('show')
}


const resetGame = () => {
    currShape = 'X'
    clicks = 0
    gameEnd = false
    cells.forEach(cell => {
        cell.innerText = ''
    })
    endScreen.classList.remove('show')
}

const availPlace = () => {
    const available = cells.filter((cell) => {
        return cell.innerText === ''
    })
    return available
}