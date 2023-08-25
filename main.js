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
    const _board = new Array(9);

    const init = () => {
        const cells = document.getElementsByClassName('cell');
         
        for (let cell = 0; cell < cells.length; cell++) {
            const curCell = cells[cell];
            _board[cell] = Cell(curCell);
        }
    };

    const getBoard = () => {
        return _board;
    };

    const setBoardCell = (idx, player) => {
        const arrCell = _board[idx];
        const domCell = document.querySelector(`[data-cell="${idx+1}"]`);
        
        const playerIcon = player.getIcon();
        arrCell.setValue(playerIcon);
        domCell.textContent = playerIcon;
    };

    return {
        init,
        getBoard,
        setBoardCell
    };
})();

const displayController = (() => {
    const setupClickHandler = () => {
        const cells = document.getElementsByClassName('cell'); 
        
        for (let cell = 0; cell < cells.length; cell++) {
            cells[cell].addEventListener('click', function cellClicked() {
                const turn = gameController.getTurn();
                gameBoard.setBoardCell(cell, turn);
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