const Cell = (obj, val = "") => {
    let _value = val;
    let _obj = obj;

    const setObj = (obj) => {
        _obj = obj;
    }
    
    const getObj = () => {
        return _obj;
    }

    const setValue = (val) => {
        _value = val;
    }
    
    const getValue = () => {
        return _value;
    }

    return {
        setValue,
        getValue,
        setObj,
        getObj
    };
};

const Player = (turn) => {
    const _player = turn;

    const getIcon = () => {
        return _player;
    };
    // setScore, getScore?

    return {
        getIcon
    };
};

const gameBoard = (() => {
    const _board = new Array(3);

    const init = () => {    // Board will be a 2D array
        const cells = document.getElementsByClassName('cell');
         
        for (let row = 0; row < _board.length; row++) {
            _board[row] = new Array(3);

            for (let col = 0; col < _board[row].length; col++) {
                const curCell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                // error handling
                _board[row][col] = Cell(curCell);
            }
        }
    };

    const getBoardState = () => {
        // Should return board outcomes 
        let row = col = diag = rdiag = 0;
    };

    const setBoardState = (cell, turn) => {
        const row = parseInt(cell.getAttribute("data-row"));
        const col = parseInt(cell.getAttribute("data-col"));
        const arrCell = _board[row][col];
        const domCell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        
        const turnIcon = turn.getIcon();
        arrCell.setValue(turnIcon);
        domCell.textContent = turnIcon;
    };

    return {
        init,
        getBoardState,
        setBoardState
    };
})();

const displayController = (() => {
    const setupClickHandler = () => {
        const cells = document.getElementsByClassName('cell'); 

        for (let cell = 0; cell < cells.length; cell++) {
            cells[cell].addEventListener('click', function cellClicked() {
                const turn = gameController.getTurn();
                gameBoard.setBoardState(cells[cell], turn);
                gameBoard.getBoardState();

                // Line 84 prevents players from taking over spots already taken
                this.removeEventListener('click', cellClicked);
            });
        }
    };

    return {
        setupClickHandler
    };
})();

const gameController = (() => {
    let _turn = '';

    const _init = () => {
        // Board
        gameBoard.init();

        // Display
        displayController.setupClickHandler();
    };

    const _setTurn = (value) => {
        _turn = value;
    }

    const getTurn = () => {
        return _turn;
    }

    _init();

    let playerX = Player('X');

    _setTurn(playerX);

    return {
        getTurn
    };
})();