export const sudokuState = {
    TaskArray: [
        ["9", ".", ".", ".", ".", ".", ".", ".", "."],
        ["6", "4", ".", "2", "1", "9", ".", "7", "."],
        [".", ".", "7", ".", "4", ".", ".", "1", "."],
        [".", "9", ".", ".", ".", "6", "2", "8", "."],
        ["3", "7", ".", ".", ".", "2", "5", ".", "."],
        ["8", ".", "6", "7", ".", ".", ".", "3", "."],
        [".", ".", ".", "9", ".", "5", "8", ".", "."],
        [".", ".", ".", ".", "6", "1", ".", ".", "."],
        [".", ".", ".", ".", "7", ".", ".", ".", "."]
    ],    
    SudokuArray: [
        ["9", ".", ".", ".", ".", ".", ".", ".", "."],
        ["6", "4", ".", "2", "1", "9", ".", "7", "."],
        [".", ".", "7", ".", "4", ".", ".", "1", "."],
        [".", "9", ".", ".", ".", "6", "2", "8", "."],
        ["3", "7", ".", ".", ".", "2", "5", ".", "."],
        ["8", ".", "6", "7", ".", ".", ".", "3", "."],
        [".", ".", ".", "9", ".", "5", "8", ".", "."],
        [".", ".", ".", ".", "6", "1", ".", ".", "."],
        [".", ".", ".", ".", "7", ".", ".", ".", "."]
    ],    
    digitToFill: 0,
    variantMode: false,
    currentCell: {
        coordX: undefined,
        coordY: undefined
    },
    modalStatus: false,
    contradictions: [],
    emptyCells: 0

}

export function quadratHandler(ev) {
    let parseCoordinateArray = ev.target.id.split('-')
    
    if (parseCoordinateArray.length === 3) {
        ev.target.classList.add('sudoku-cell-active')
    } else {
        parseCoordinateArray = ev.target.parentNode.parentNode.id.split('-')
        ev.target.parentNode.parentNode.classList.add('sudoku-cell-active')
    }  

    sudokuState.currentCell.coordX = Number(parseCoordinateArray[1])
    sudokuState.currentCell.coordY = Number(parseCoordinateArray[2])

    fillStatusBarPanel()
}

export function fillTable(sudokuArray) {
    const ContentBar = document.querySelector(".sudoku-table")
    ContentBar.innerHTML = ''

    sudokuState.emptyCells = 0
    let rowIndex = 0
    
    sudokuArray.forEach(currentArrayRow => {
        let columnIndex = 0
        let currentRow = document.createElement('div')
        currentRow.classList.add('sudoku-main-row')

        if (rowIndex % 3 == 0) {
            currentRow.classList.add('sudoku-top-block-row')
        }
        
        if (rowIndex % 3 == 2) {
            currentRow.classList.add('sudoku-bottom-block-row')
        }
        
        currentArrayRow.forEach(currentArrayCell => {
            let currentCell = document.createElement('div')
            
            let CellType = `${typeof(currentArrayCell)}`
            
            currentCell.classList.add('sudoku-main-quadrat')
            currentCell.id = `sudquad-${rowIndex}-${columnIndex}`

            if (columnIndex % 3 == 0) {
                currentCell.classList.add('sudoku-left-block-cell')
            }
            
            if (columnIndex % 3 == 2) {
                currentCell.classList.add('sudoku-right-block-cell')
            }
                
            currentCell.addEventListener('click', quadratHandler)

            if (CellType === 'object') {
                let smallRow = ''
                
                for (let cell_ind = 0; cell_ind < 9; cell_ind++) {
                    let cur_y = cell_ind % 3

                    if (cur_y == 0) {
                        smallRow = document.createElement('div')
                        smallRow.classList.add('sudoku-small-row')
                    }

                    let smallQuadrat = document.createElement('div')
                    smallQuadrat.classList.add('sudoku-small-quadrat')
                    
                    if ( currentArrayCell.includes(`${cell_ind + 1}`) ) {
                        smallQuadrat.innerHTML = `${cell_ind + 1}`
                    }
                    smallRow.append(smallQuadrat)

                    if (cur_y == 2) {
                        currentCell.append(smallRow)        
                    }
                }

                sudokuState.emptyCells++

            }
            
            else {

                
                if (currentArrayCell === '.') {
                    currentCell.innerHTML = '&nbsp;'
                    sudokuState.emptyCells++    
                } else { 
                    currentCell.innerHTML = `${currentArrayCell}`
                    if (sudokuState.TaskArray[rowIndex][columnIndex] === currentArrayCell) {
                        currentCell.classList.add('sudoku-task-protected')
                    }
                }
    
            }
            columnIndex++
            
            currentRow.append(currentCell)
        })

        rowIndex++
        ContentBar.append(currentRow)
    })
}

export function fillStatusBarPanel(extraInfo = undefined) {
    const statusBarPanel = document.querySelector('.sudoku-status-bar-panel')
    statusBarPanel.innerHTML = ''

    const divDigitToFill = document.createElement('div')
    divDigitToFill.innerHTML = `Цифра к заполнению: ${sudokuState.digitToFill}`
    statusBarPanel.append(divDigitToFill)

    const divVariantMode = document.createElement('div')
    divVariantMode.innerHTML = `Множественный выбор: ${sudokuState.variantMode}`
    statusBarPanel.append(divVariantMode)

    const divCoordinates = document.createElement('div')
    divCoordinates.innerHTML = `Координаты ячейки: (${sudokuState.currentCell.coordX},${sudokuState.currentCell.coordY})`
    statusBarPanel.append(divCoordinates)

    const divEmptyCells = document.createElement('div')
    divCoordinates.innerHTML = `Пустых ячеек: (${sudokuState.emptyCells})`
    statusBarPanel.append(divCoordinates)

    if (Array.isArray(extraInfo)) {
        extraInfo.forEach((extraInfoElement) => {
            const divExtraInfo = document.createElement('div')
            divExtraInfo.innerHTML = extraInfoElement
            statusBarPanel.append(divExtraInfo)        
        })
    }
}

export function sudokuFillDigitButtonClick(numb) {
    sudokuState.digitToFill = numb

    let extraInfo = []

    if (!sudokuState.modalStatus && sudokuState.currentCell.coordX !== undefined && sudokuState.currentCell.coordY !== undefined) {

        if (sudokuState.variantMode) {
            const oldCellValue = sudokuState.SudokuArray[sudokuState.currentCell.coordX][sudokuState.currentCell.coordY]
            let pushToArray = false

            if (Array.isArray(oldCellValue)) {
                if (oldCellValue.includes(sudokuState.digitToFill)) {
                    sudokuState.SudokuArray[sudokuState.currentCell.coordX][sudokuState.currentCell.coordY] = oldCellValue
                        .filter(el => el !== sudokuState.digitToFill)
                } else {
                    pushToArray = true
                }
            } else {
                sudokuState.SudokuArray[sudokuState.currentCell.coordX][sudokuState.currentCell.coordY] = []
                if (oldCellValue !== '.') {
                    sudokuState.SudokuArray[sudokuState.currentCell.coordX][sudokuState.currentCell.coordY].push(oldCellValue)    
                }
                pushToArray = true    
            }
            
            if (pushToArray) {
                sudokuState.SudokuArray[sudokuState.currentCell.coordX][sudokuState.currentCell.coordY].push(sudokuState.digitToFill)
            }
            
        } else {
            sudokuState.SudokuArray[sudokuState.currentCell.coordX][sudokuState.currentCell.coordY] = sudokuState.digitToFill

            sudokuState.currentCell.coordX + sudokuState.currentCell.coordY
            
            //let blockIndex = Math.floor(sudokuState.currentCell.coordY / 3) + 3 * Math.floor(sudokuState.currentCell.coordX / 3)
            let inBlockIndex = 3 * (sudokuState.currentCell.coordX % 3) + sudokuState.currentCell.coordY % 3

            let arr1 = []
            let arr2 = []
            let arr3 = []

            for (var ij = 0; ij < 9; ij++) {
                let inRow = sudokuState.SudokuArray[sudokuState.currentCell.coordX][ij]
                let inColumn = sudokuState.SudokuArray[ij][sudokuState.currentCell.coordY]
                let inBlockRow = 3 * Math.floor(sudokuState.currentCell.coordX / 3) + Math.floor(ij / 3)
                let inBlockColumn = 3 * Math.floor(sudokuState.currentCell.coordY / 3) + Math.floor(ij % 3)
                let inBlock = sudokuState.SudokuArray[inBlockRow][inBlockColumn]

                if ((inRow !== ".") && (ij !== sudokuState.currentCell.coordY)){
                    if (Array.isArray(inRow)) {
                        sudokuState.SudokuArray[sudokuState.currentCell.coordX][ij] = inRow.filter(el => el !== sudokuState.digitToFill)
                    } else {
                        arr1.push(inRow)
                    }
                }
                if ((inColumn !== ".") && (ij !== sudokuState.currentCell.coordX)){
                    if (Array.isArray(inColumn) ) {
                        sudokuState.SudokuArray[ij][sudokuState.currentCell.coordY] = inColumn.filter(el => el !== sudokuState.digitToFill)
                    } else {
                        arr2.push(inColumn)
                    }
                }
                if ((inBlock !== ".") && (ij !== inBlockIndex)){
                    if (Array.isArray(inBlock) ) {
                        sudokuState.SudokuArray[inBlockRow][inBlockColumn] = inBlock.filter(el => el !== sudokuState.digitToFill)
                    } else {
                        arr3.push(inBlock)
                    }
                }
            }

            if (arr1.includes(String(sudokuState.digitToFill)) || arr2.includes(String(sudokuState.digitToFill)) || arr3.includes(String(sudokuState.digitToFill))) {
                sudokuState.contradictions.push(9 * sudokuState.currentCell.coordX + sudokuState.currentCell.coordY)
            } 

            extraInfo.push(sudokuState.contradictions)

            sudokuState.currentCell.coordX = undefined
            sudokuState.currentCell.coordY = undefined
        }
        
        fillTable(sudokuState.SudokuArray)
        
    }

    fillStatusBarPanel(extraInfo)

}

export function sudokuHandler(evParamList) {
    
    const fillDigitButtonArray = document.querySelectorAll('.sudoku-fill-digit-button')
    fillDigitButtonArray.forEach(btn => {
        btn.addEventListener('click', ev => {
            sudokuFillDigitButtonClick(ev.target.id.split('-')[2])
        })
    } )

    const toggleModeButton = document.querySelector("#sudoku-btn-M")
    toggleModeButton.addEventListener('click', () => {
        sudokuState.variantMode = !sudokuState.variantMode
        fillStatusBarPanel()
    })

    const eraseButton = document.querySelector("#sudoku-btn-E")
    eraseButton.addEventListener('click', () => {
        if (sudokuState.currentCell.coordX !== undefined && sudokuState.currentCell.coordY !== undefined) {
            sudokuState.SudokuArray[sudokuState.currentCell.coordX][sudokuState.currentCell.coordY] = '.'
            fillTable(sudokuState.SudokuArray)
        }
    })

    const newGameButton = document.querySelector('#sudoku-btn-new-game')
    const modalWindow = document.querySelector(".sudoku-modal")   
    const modalProtectLayer = document.querySelector(".sudoku-protect-layer") 
    newGameButton.addEventListener('click', () => {
        if (!sudokuState.modalStatus) { 
            modalProtectLayer.classList.toggle('hide')
            modalWindow.classList.toggle('hide')
            sudokuState.modalStatus = true
        }
    })

    const newGameButtons = document.querySelectorAll(".sudoku-modal-button")
    newGameButtons.forEach(el => {
        if (el.id === 'return-to-game') {
            el.addEventListener('click', ev => {
                modalProtectLayer.classList.toggle('hide')
                modalWindow.classList.toggle('hide')
                sudokuState.modalStatus = false
            })
        }
        else {
            const strPath = el.id.replace('new-game', 'http://127.0.0.1:5000/get')
            if (el.id.endsWith('simple') || el.id.endsWith('middle')) {
                console.log('simple')
                el.addEventListener('click', async () => {
                    const newBoard = await fetch('http://127.0.0.1:5000/get-simple')
                    const newBoardData = await newBoard.json()
                    let rowIndex = 0
                    newBoardData.board.forEach(rr => {
                        let columnIndex = 0
                        rr.forEach(celEl => {
                            sudokuState.TaskArray[rowIndex][columnIndex] = celEl
                            sudokuState.SudokuArray[rowIndex][columnIndex] = celEl
                            columnIndex += 1
                        })
                        rowIndex += 1
                    })
            
                    fillTable(sudokuState.SudokuArray)
                    modalProtectLayer.classList.toggle('hide')
                    modalWindow.classList.toggle('hide')
                    sudokuState.modalStatus = false
                                
                })    
            } else {
                el.addEventListener('click', async () => {
                    const newBoard = await fetch('http://127.0.0.1:5000/get-middle')
                    const newBoardData = await newBoard.json()
                    let rowIndex = 0
                    newBoardData.board.forEach(rr => {
                        let columnIndex = 0
                        rr.forEach(celEl => {
                            sudokuState.TaskArray[rowIndex][columnIndex] = celEl
                            sudokuState.SudokuArray[rowIndex][columnIndex] = celEl
                            columnIndex += 1
                        })
                        rowIndex += 1
                    })
                
                    fillTable(sudokuState.SudokuArray)
                    modalProtectLayer.classList.toggle('hide')
                    modalWindow.classList.toggle('hide')
                    sudokuState.modalStatus = false                                
                })
            }
        }
    })

    fillTable(sudokuState.SudokuArray)
    fillStatusBarPanel()
}
