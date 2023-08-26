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
        return _board;
    };

    const setBoardState = (cell, turn) => {
        const row = parseInt(cell.getAttribute("data-row"));
        const col = parseInt(cell.getAttribute("data-col"));
        const arrCell = _board[row][col];
        
        const turnIcon = turn.getIcon();
        arrCell.setValue(turnIcon);

        gameController.toggleTurn();
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
                _updateScreen();

                // Line 84 prevents players from taking over spots already taken
                this.removeEventListener('click', cellClicked);
            });
        }
    };

    const _updateScreen = () => {
        const cells = document.getElementsByClassName('cell'); 

        for (let cell = 0; cell < cells.length; cell++) {
            const row = parseInt(cells[cell].getAttribute("data-row"));
            const col = parseInt(cells[cell].getAttribute("data-col"));
            const board = gameBoard.getBoardState();

            cells[cell].textContent = board[row][col].getValue();
        }
    };

    return {
        setupClickHandler
    };
})();

const gameController = (() => {
    let _players = [
        Player('X'),
        Player('O')
    ];
    let _turn = _players[0];

    const _init = () => {
        // Board
        gameBoard.init();

        // Display
        displayController.setupClickHandler();
    };

    const toggleTurn = () => {
        if (_turn === _players[0]) _turn = _players[1]; 
        else _turn = _players[0];
    }

    const getTurn = () => {
        return _turn;
    }

    _init();

    return {
        getTurn,
        toggleTurn
    };
})();