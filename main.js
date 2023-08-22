const gameBoard = (() => {
    const initBoard = () => ['O', 'O', 'O',
                             'X', 'X', 'X',          
                             'O', 'O', 'X'];
    return {
        initBoard
    };
})();

const gameController = (() => {
    const board = gameBoard.initBoard();

    const showBoardState = () => board;

    return {
        showBoardState
    };
})();

console.log(gameController.showBoardState());