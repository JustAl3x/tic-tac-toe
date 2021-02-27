const XSymbol = "X";
const OSymbol = "O";

const Game = ((playerOne, playerTwo) => {
    currentPlayer = playerOne;

    return {currentPlayer}
})();

const GameBoard = (() => {
    const board = [[],[],[]];

    const selectSquare = (player, index) => {
        let row = GameLogic.convertIndexToRow(index);
        let col = GameLogic.convertIndexToColumn(index);

        board[row][col] = [player.symbol];
    }

    return {board, selectSquare}
})();

const GameLogic = (() => {
    /*The following two functions convert a 1d array index to a 2d array index.
    * In our case, it will be used to convert from the data attribute 
    */

    const convertIndexToRow = (index) => {
        return index / 3; 
    }

    const convertIndexToColumn = (index) => {
        return index % 3;
    }

    return {convertIndexToColumn, convertIndexToRow}
})();

const DisplayController = (() => {
    const updateSquare = (index) => {

    }
    
    return { updateSquare }

})();

const PlayerFactory = (name, symbol) => {   
    return { name, symbol };
};

