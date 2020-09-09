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

const human = 'X'
const ai = 'O'
let currPlayer = human
let clicks = 0
let gameEnd = false


cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        if (cell.innerText === '') {
            cell.innerText = currPlayer
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
    const winner = checkWin()
    console.log(winner)
    if (winner !== null) {
        endGame(winner)
    }
    changePlayer()
}

const aiPlay = () => {
    const available = cells.filter((cell) => {
        return cell.innerText === ''
    })
    if (available.length !== 0) {
        available[Math.floor(Math.random() * available.length)].innerText = currPlayer
        clicks += 1
        gameLoop()
    }
}

const changePlayer = () => {
    if (currPlayer === human) {
        currPlayer = ai
    } else {
        currPlayer = human
    }
}

const checkWin = () => {
    let winner = null
    combinations.forEach((arr) => {
        if (cells[arr[0]].innerText === currPlayer && cells[arr[1]].innerText === currPlayer && cells[arr[2]].innerText === currPlayer) {
            winner = currPlayer
        }
    })
    if (winner === null && clicks === 9) {
        winner = 'T'
    }
    return winner
}

const endGame = (shape) => {
    gameEnd = true
    if (shape !== 'T') {
        endScreen.firstElementChild.innerText = shape + '  WINS !!!'
    } else {
        endScreen.firstElementChild.innerText = 'IT\'S A DRAW.'
    }

    endScreen.classList.add('show')
}

const resetGame = () => {
    currPlayer = human
    clicks = 0
    gameEnd = false
    cells.forEach(cell => {
        cell.innerText = ''
    })
    endScreen.classList.remove('show')
}