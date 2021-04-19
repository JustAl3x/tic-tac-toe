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

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    const checkForWinner = (winner) => {
        return GameBoard.determineWinner(playerOne, playerTwo);
    }

    

    return {currentPlayer, nextPlayer, getCurrentPlayer, checkForWinner};
})();

const GameBoard = (() => {
    const board = [[],[],[]];

    const resetBoard = () => {
        for (i = 0; i < 3; i++){
            for (j=0; j<3; j++){
                board[i][j] = '';
            }
        }
    }

    const selectSquare = (player, index) => {
        let row = GameLogic.convertIndexToRow(index);
        let col = GameLogic.convertIndexToColumn(index);

        if (board[row][col] === XSymbol || board[row][col] === OSymbol) {
            return false;
        } else {
            board[row][col] = player.symbol;
            GameController.nextPlayer();
            winner = GameController.checkForWinner();
            if (winner != null) {
                DisplayController.updateWinner(winner);
            }
            return true;
        }
    }

    const determineWinner = (playerOne, playerTwo) => {
        winner = _checkHorizontals(playerOne, playerTwo);
        if (winner === null)
            winner = _checkVerticals(playerOne, playerTwo);
        if (winner === null)
            winner = _checkDiagonals(playerOne, playerTwo);
        
        return winner;
    }

    const _checkHorizontals = (playerOne, playerTwo) => {
        for (i = 0; i < 3; i++) {
            result = 0
            for (j = 0; j < 3; j++) {
                if (board[i][j] === playerOne.symbol) {
                    result += 1;
                } else if (board[i][j] === playerTwo.symbol) {
                    result -=1;
                }
                if (result === 3)
                    return playerOne;
                else if (result === -3)
                    return playerTwo
            }  
        }
        return null;
    }

    const _checkVerticals = (playerOne, playerTwo) => {
        for (i = 0; i < 3; i++) {
            result = 0
            for (j = 0; j < 3; j++) {
                if (board[j][i] === playerOne.symbol) {
                    result += 1;
                } else if (board[j][i] === playerTwo.symbol) {
                    result -=1;
                }
                if (result === 3)
                    return playerOne;
                else if (result === -3)
                    return playerTwo
            }
        }
        return null;
    }

    const _checkDiagonals = (playerOne, playerTwo) => {
        if (board[0][0] === playerOne.symbol && board[1][1] === playerOne.symbol
            && board[2][2] === playerOne.symbol)
        {
            return playerOne;
        } else if (board[0][0] === playerTwo.symbol && board[1][1] === playerTwo.symbol
            && board[2][2] === playerTwo.symbol)
        {
            return playerTwo;
        } else if (board[0][0] === playerOne.symbol && board[1][1] === playerOne.symbol
            && board[2][2] === playerOne.symbol)
        {
            return playerOne;
        } else if (board[0][0] === playerOne.symbol && board[1][1] === playerOne.symbol
            && board[2][2] === playerOne.symbol)
        {
            return playerTwo;
        }   

        return null;
    }
        

    return {board, selectSquare, determineWinner, resetBoard}
})();

const GameLogic = (() => {
    /*The following two functions convert a 1d array index to a 2d array index.
    * In our case, it will be used to convert from the data attribute 
    */

    const convertIndexToRow = (index) => {
        return parseInt(index / 3); 
    }

    const convertIndexToColumn = (index) => {
        return parseInt(index % 3);
    }

    return {convertIndexToColumn, convertIndexToRow}
})();

//Responsible for updating the page

const DisplayController = (() => {
    const winnerText = document.querySelector("#winner");

    const updateWinner = (player)  => {
        winnerText.innerHTML = player.name + " wins!";
    }

    const clearBoard = () => {
        squares.forEach(square => {
            square.innerHTML = "";
        })
        winnerText.innerHTML = "";
    }
    return {updateWinner, clearBoard}
})();


// On click function for game squares.
const squares = document.querySelectorAll(".board-square");
squares.forEach(square => {
    square.addEventListener("click", () => {

        let symbol = GameController.getCurrentPlayer().symbol;
        if (GameBoard.selectSquare(GameController.getCurrentPlayer(), parseInt(square.dataset.index)))
        { 
            square.innerHTML = symbol;
        }
    })
});

const newGame = document.querySelector("#new-game-button")
newGame.addEventListener("click", () => {
    DisplayController.clearBoard();
    GameBoard.resetBoard();
})

//On click function for new game

