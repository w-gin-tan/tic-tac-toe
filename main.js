const Cell = (val = "") => {
    const _value = val;

    const setValue = (val) => {
        _value = val;
    }
    
    const getValue = () => {
        return _value;
    }

    return {
        setValue,
        getValue
    };
};

const Player = (turn) => {
    const player = turn;

    // setScore, getScore?

    return {
        player
    };
};

const gameBoard = (() => {
    const _board = new Array(9).fill(Cell(Player('X')).getValue());

    const init = () => {
        // for loop create cells
        // setup with DOM onclick elements connected to each cell in init
    };

    const getBoard = () => {
        return _board;
    }

    return {
        init,
        getBoard
    };
})();

const gameController = (() => {

    // all this stuff in displaycontroller
    gameBoard.init();

    // const playerX = Player('X');
    // const playerY = Player('Y');

    // setup game board
    // DOM display board and click functions

    showBoardState = gameBoard.getBoard();
    console.log(showBoardState);

    return {
        showBoardState
    };
})();