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
    const player = turn;

    const getIcon = () => {
        return player;
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
        // loop through cells 
        for (let cell = 0; cell < cells.length; cell++) {
            const curCell = cells[cell];
            _board[cell] = Cell(curCell);
        }
    };

    const getBoard = () => {
        return _board;
    };

    const setBoardCell = (idx, player) => {
        const actualIdx = idx-1;
        const arrCell = _board[actualIdx];
        const domCell = document.querySelector(`[data-cell="${idx}"]`);
        
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

const gameController = (() => {

    // all this stuff in displaycontroller
    gameBoard.init();

    let playerX = Player('X');
    let playerO = Player('O');

    gameBoard.setBoardCell(3, playerX);
    gameBoard.setBoardCell(5, playerO);

    // setup game board
    // DOM display board and click functions

    showBoardState = gameBoard.getBoard();
    console.log(showBoardState);

    return {
        showBoardState
    };
})();