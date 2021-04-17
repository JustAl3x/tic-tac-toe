const XSymbol = "X";
const OSymbol = "O";

const PlayerFactory = (name, symbol) => {   
    return { name, symbol };
};

//Controls game flow
const GameController = (() => {
    const playerOne = PlayerFactory("Player 1", XSymbol);
    const playerTwo = PlayerFactory("Player 2", OSymbol);   
    let currentPlayer = playerOne;

    const nextPlayer = () => {
        if (currentPlayer == playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
        return currentPlayer;
    }

    return {currentPlayer, nextPlayer};
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

//Responsible for updating the page
const DisplayController = (() => {
    const updateSquare = (index) => {
        document.querySelector("")
    }
    
    return { updateSquare }

})();


const squares = document.querySelectorAll(".board-square");
squares.forEach(square => {
    square.addEventListener("click", () => {
        let symbol = GameController.currentPlayer.symbol;
        square.innerHTML = symbol;
        console.log(GameController.nextPlayer());
    })
});


