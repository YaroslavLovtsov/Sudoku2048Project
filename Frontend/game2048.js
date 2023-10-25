export const g2048State = {
    gameStarted: true,
    is2048: false,
    arr: [
        [0, 0, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 4, 0],
        [0, 0, 0, 0]
    ]
}

export const g2048Undo = document.getElementById('g2048-undo')

export function game2048keyDown(ev) {
    
    if ((ev.keyCode >= 37 && ev.keyCode <= 40) && (g2048State.gameStarted)) {
        let tableCopy = g2048processTable(g2048TableCopy(g2048State.arr, ev.keyCode))
        g2048State.arr = g2048TableCopy(tableCopy, ev.keyCode)

        let newMoveGenArr = []
        let moveNotExist = true

        let g2048Status = document.getElementById("g2048-status")

        for (let ii = 0; ii < 4; ii++) {
            for (let jj = 0; jj < 4; jj++) {
                if (g2048State.arr[ii][jj] === 0) {
                    newMoveGenArr.push({
                        iCoord: ii,
                        jCoord: jj
                    })
                }

                if (g2048State.arr[ii][jj] === 2048) {
                    g2048State.is2048 = true
                }
            } 
        }

        if (newMoveGenArr.length !== 0) {

            let randValue = Math.random() * newMoveGenArr.length
            let coords = newMoveGenArr[Math.floor(randValue)]
            if (Math.round(100 * (randValue - Math.floor(randValue))) <= 85) {
                g2048State.arr[coords.iCoord][coords.jCoord] = 2
            } else {
                g2048State.arr[coords.iCoord][coords.jCoord] = 4
            }

            
        }

        if (newMoveGenArr.length <= 1) {
            g2048Status.innerHTML = `Вы в опасности`
            moveNotExist = true 
            
            for (let ii = 0; ii < 4; ii++) {
                for (let jj = 0; jj < 4; jj++) { 
                    console.log(newMoveGenArr.length)
                
                    if (ii > 0) {
                        moveNotExist = moveNotExist && (g2048State.arr[ii - 1][jj] != g2048State.arr[ii][jj])
                    }
                    
                    if (ii < 3) {
                        moveNotExist = moveNotExist && (g2048State.arr[ii + 1][jj] != g2048State.arr[ii][jj])
                    } 
                    
                    if (jj > 0) {
                        moveNotExist = moveNotExist && (g2048State.arr[ii][jj - 1] != g2048State.arr[ii][jj])
                    }
                    
                    if (jj < 3) {
                        moveNotExist = moveNotExist && (g2048State.arr[ii][jj + 1] != g2048State.arr[ii][jj])
                    } 
                }
            }
        
        if (moveNotExist) {
                g2048State.gameStarted = false
                g2048Status.innerHTML = `Игра окончена. ${g2048State.is2048 ? 'Вы победили...' : 'Вы проиграли...' }`
            }
        }

        g2048FillTable(g2048State)
    } 
    
}

export function g2048FillTable(st) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            let currentCell = document.getElementById(`g2048_${i}_${j}`)
            let cellValue = st.arr[i][j]

            currentCell.innerHTML = cellValue == 0 ? '' : cellValue
            let oldClass = currentCell.classList[1]
            let classType = cellValue === 0 ? 'g2048-empty' : `g2048-d${Math.ceil(Math.log10(cellValue))}` 
            currentCell.classList.remove(oldClass)
            currentCell.classList.add(classType)
        }
    }

} 

export function g2048TableCopy(table, mode) {
    let tableCopy = []

    for (var i = 0; i < 4; i++) {
        let tableCopyRow = []
        
        for (var j = 0; j < 4; j++) {
            if (mode === 39)  {
                tableCopyRow.push(table[i][3-j])
            } else if (mode === 38) {
                tableCopyRow.push(table[j][i])
            } else if (mode === 40) {
                tableCopyRow.push(table[3-j][3-i])
            } else {
                tableCopyRow.push(table[i][j])
            }
        }

        tableCopy.push(tableCopyRow)
    } 

    return tableCopy
}

export function g2048ProcessRow(arr) {
    const lng = arr.length
    const filteredList = arr.filter(el => el != 0)
    let resultList = []
    filteredList.forEach(el => resultList.push(el))

    for (let ii = 0; ii < lng; ii ++) {
        resultList.push(0)
    }
    
    resultList = resultList.slice(0, lng)
    let newList = []

    if (filteredList.length <= 1){
        newList = resultList
    } else if (resultList[0] == resultList[1])
    {   
        newList.push(2 * resultList[0])
        g2048ProcessRow(resultList.slice(2, lng)).forEach(el => {
            newList.push(el)    
        })
        newList.push(0)
    } else{
        newList.push( resultList[0] )
        g2048ProcessRow(resultList.slice(1, lng)).forEach(el => {
            newList.push(el)    
        })
    }
         

    return newList
}

export function g2048processTable(tbl) {
    let result = []
    tbl.forEach(row => {
        result.push(g2048ProcessRow(row))
    })

    return result
}

export function game2048Handler(evParamList) {
    
    let g2048Status = document.getElementById("g2048-status")
    const g2048NewGame = document.getElementById('g2048-new-game')
    console.log(g2048NewGame)

    document.addEventListener('keydown', game2048keyDown)
    g2048NewGame.addEventListener('click', (ev) => {
        console.log(ev)
        g2048State.gameStarted = true
        g2048State.is2048 = false
        g2048State.arr = [
            [0, 0, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 4, 0],
            [0, 0, 0, 0]
        ]
        
        g2048Status.innerHTML = 'Хорошей игры'
        g2048FillTable(g2048State)
    })
    g2048Status.innerHTML = 'Хорошей игры'
    g2048FillTable(g2048State)
}