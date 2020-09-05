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

let currShape = 'X'
const changeShape = () => {
    if (currShape === 'X') {
        currShape = 'O'
    } else {
        currShape = 'X'
    }
}

const gameLoop = () => {
    combinations.forEach((arr) => {
        if (cells[arr[0]].innerText === currShape && cells[arr[1]].innerText === currShape && cells[arr[2]].innerText === currShape) {
            endGame(currShape)
        }

    })
    if (clicks === 9) {
        endGame()
    }
    changeShape()

}


const endGame = (shape) => {
    if (shape) { 
        endScreen.firstElementChild.innerText = shape + '  WINS !!!' 
    } else{
        endScreen.firstElementChild.innerText = 'IT\'S A DRAW.'  
    }

    endScreen.classList.add('show')
}


const resetGame = () => {
    currShape = 'X'
    clicks = 0
    cells.forEach(cell => {
        cell.innerText = ''
    })
    endScreen.classList.remove('show')
}

cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        if (cell.innerText === '') {
            clicks += 1
            cell.innerText = currShape
            gameLoop()
        }
    })
})

restartButon.addEventListener('click', () => {
    resetGame()
})