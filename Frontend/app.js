import { quadratHandler, fillTable, fillStatusBarPanel, sudokuFillDigitButtonClick, 
        sudokuHandler, sudokuState } from './sudoku.js'
import { game2048Handler, game2048keyDown, g2048FillTable,  
        g2048ProcessRow, g2048processTable, g2048TableCopy, 
        g2048State  } from './game2048.js'

const sudokuButton = document.querySelector('#sudoku-button')
const game2048Button = document.querySelector('#game2048-button')
const contentBar = document.querySelector(".content-bar")

const SETTINGS = {
    sudokuSetting:
    {
        'id': '-btn-projects-Sudoku',
        'screenName': '#sudoku-screen',
        'screenContent': `
        <div class="sudoku-header"> Судоку </div>
            <div class="sudoku-body">
                <div class="sudoku-table">
                    1
                </div>
                <div class="sudoku-protect-layer hide">.</div>
                <div class = "sudoku-modal hide">
                    <div class="sudoku-levels">
                        <button class="sudoku-modal-button" id="new-game-simple">Простая</button>
                        <button class="sudoku-modal-button" id="new-game-middle">Средняя</button>
                        <button class="sudoku-modal-button" id="new-game-hard">Сложная</button>
                        <button class="sudoku-modal-button" id="new-game-professional">Профессионал</button>
                        <button class="sudoku-modal-button" id="new-game-expert">Эксперт</button>
                    </div>
                    <div class="sudoku-load-warning">Подождите, идет загрузка</div>
                    <button class="sudoku-modal-button" id="return-to-game">Вернуться к игре</button>
                </div>
                <div class="sudoku-settings">
                    <div class="sudoku-btn-row">
                        <button class="sudoku-settings-new-button" id="sudoku-btn-new-game">Новая игра</button>
                    </div>
                    <div class="sudoku-btn-row">
                        <button class="sudoku-settings-button sudoku-fill-digit-button" id="sudoku-btn-1">1</button>
                        <button class="sudoku-settings-button sudoku-fill-digit-button" id="sudoku-btn-2">2</button>
                        <button class="sudoku-settings-button sudoku-fill-digit-button" id="sudoku-btn-3">3</button>
                    </div>
                    <div class="sudoku-btn-row">
                        <button class="sudoku-settings-button sudoku-fill-digit-button" id="sudoku-btn-4">4</button>
                        <button class="sudoku-settings-button sudoku-fill-digit-button" id="sudoku-btn-5">5</button>
                        <button class="sudoku-settings-button sudoku-fill-digit-button" id="sudoku-btn-6">6</button>
                    </div>
                    <div class="sudoku-btn-row">
                        <button class="sudoku-settings-button sudoku-fill-digit-button" id="sudoku-btn-7">7</button>
                        <button class="sudoku-settings-button sudoku-fill-digit-button" id="sudoku-btn-8">8</button>
                        <button class="sudoku-settings-button sudoku-fill-digit-button" id="sudoku-btn-9">9</button>
                    </div>

                    <div class="sudoku-btn-row">
                        <button class="sudoku-settings-button" id="sudoku-btn-X">X</button>
                        <button class="sudoku-settings-button" id="sudoku-btn-E">E</button>
                        <button class="sudoku-settings-button" id="sudoku-btn-M">M</button>
                    </div>

                    <div class="sudoku-status-bar-panel">1</div>

                </div>`,
        'clickHandler': sudokuHandler
    },
    game2048Setting:
    {
        'id': 'btn-projects-Game2048',
        'screenName': '#game2048-screen',
        'screenContent': `
        <h2>Игра 2048</h2>
                <div class='g2048-status-settings'>
                    <div id= 'g2048-status' class = 'g2048-status'>
                        Хорошей игры!
                    </div>
                    <span>
                        <button id="g2048-new-game">Начать игру</button>
                    </span>
                    <span>
                        <button id="g2048-undo">Отменить ход</button>
                    </span>
                </div>
                <div class="g2048-table">
                <div class="g2048-row">
                    <div id="g2048_0_0" class="g2048-cell g2048-d1">2</div>
                    <div id="g2048_0_1" class="g2048-cell g2048-d1">4</div>
                    <div id="g2048_0_2" class="g2048-cell g2048-empty"></div>
                    <div id="g2048_0_3" class="g2048-cell g2048-empty"></div>
                </div>
                <div class="g2048-row">
                    <div id="g2048_1_0" class="g2048-cell g2048-d2">32</div>
                    <div id="g2048_1_1" class="g2048-cell g2048-empty"></div>
                    <div id="g2048_1_2" class="g2048-cell g2048-empty"></div>
                    <div id="g2048_1_3" class="g2048-cell g2048-d3">256</div>
                </div>
                <div class="g2048-row">
                    <div id="g2048_2_0" class="g2048-cell g2048-empty"></div>
                    <div id="g2048_2_1" class="g2048-cell g2048-empty"></div>
                    <div id="g2048_2_2" class="g2048-cell g2048-d4">4096</div>
                    <div id="g2048_2_3" class="g2048-cell g2048-empty"></div>
                </div>
                <div class="g2048-row">
                    <div id="g2048_3_0" class="g2048-cell g2048-empty"></div>
                    <div id="g2048_3_1" class="g2048-cell g2048-d5">16384</div>
                    <div id="g2048_3_2" class="g2048-cell g2048-empty"></div>
                    <div id="g2048_3_3" class="g2048-cell g2048-d6">131072</div>
                </div>
            </div>`,
            clickHandler: game2048Handler
    }
}

sudokuButton.addEventListener('click', () => {
    mainMenuButtonClickHandler(SETTINGS.sudokuSetting)
})

game2048Button.addEventListener('click', () => {
    mainMenuButtonClickHandler(SETTINGS.game2048Setting)
})

let mainMenuButtonClickHandler = function (showBarSettings) {
    let strID = showBarSettings.id
    contentBar.innerHTML = showBarSettings.screenContent
    document.removeEventListener('keydown', game2048keyDown)
    showBarSettings.clickHandler(strID.split('-'))
}

