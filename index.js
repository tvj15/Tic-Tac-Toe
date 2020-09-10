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
let gameEnd = false


cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        if (cell.innerText === '') {
            cell.innerText = currPlayer
            gameLoop()
            if (!gameEnd) {
                setTimeout(() => {
                    // aiRandomPlay()
                    aiMinimaxPlay()
                }, 100)
            }
        }
    })
})

restartButon.addEventListener('click', () => {
    resetGame()
})

const gameLoop = () => {
    const winner = checkWin()
    if (winner !== null) {
        endGame(winner)
    }
    changePlayer()
}

const aiRandomPlay = () => {
    const available = emptyCells()
    if (available.length !== 0) {
        available[Math.floor(Math.random() * available.length)].innerText = currPlayer
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
    const available = emptyCells()
    combinations.forEach((arr) => {
        if (cells[arr[0]].innerText === cells[arr[1]].innerText && cells[arr[1]].innerText === cells[arr[2]].innerText) {
            if (cells[arr[0]].innerText === human) {
                winner = human
            } else if (cells[arr[0]].innerText === ai) {
                winner = ai
            }
        }
    })
    if (winner === null && available.length === 0) {
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
    gameEnd = false
    cells.forEach(cell => {
        cell.innerText = ''
    })
    endScreen.classList.remove('show')
}

const emptyCells = () => {
    const available = cells.filter((cell) => {
        return cell.innerText === ''
    })
    return available
}

const scores = {
    'X': -10,
    'O': +10,
    'T': 0
}

const aiMinimaxPlay = () => {
    const available = emptyCells()
    let bestScore = -Infinity
    let bestMove
    for (let i = 0; i < available.length; i++) {
        available[i].innerText = currPlayer
        const score = minimax(false, 0, -Infinity, Infinity)
        available[i].innerText = ''
        if (score > bestScore) {
            bestScore = score
            bestMove = available[i]
        }
    }
    bestMove.innerText = ai
    gameLoop()
}

const minimax = (maxTurn, depth, alpha, beta) => {
    let winner = checkWin()
    if (winner !== null) {
        return scores[winner]
    }
    if (maxTurn) {
        const available = emptyCells()
        let bestScore = -Infinity
        for (let i = 0; i < available.length; i++) {
            available[i].innerText = ai
            const score = minimax(false, depth + 1, alpha, beta)
            available[i].innerText = ''
            bestScore = Math.max(bestScore, score)
            alpha = Math.max(alpha, bestScore)
            if (alpha >= beta) {
                break
            }
        }
        return bestScore
    } else {
        const available = emptyCells()
        let bestScore = Infinity
        for (let i = 0; i < available.length; i++) {
            available[i].innerText = human
            const score = minimax(true, depth + 1, alpha, beta)
            available[i].innerText = ''
            bestScore = Math.min(bestScore, score)
            beta = Math.min(beta, bestScore)
            if (beta <= alpha) {
                break
            }
        }
        return bestScore
    }
}