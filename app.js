// gameboard object 
const GameBoard = {
    gameBoard: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    getEmptyIndexes: function(){
        return (this.gameBoard.filter(element => typeof(element) ==  "number"))
    }
}

// only things that fetches things from the dom 
const cacheDom = (function(){
    const tiles = document.querySelectorAll(".tile");
    const initialModal = document.getElementById("initial-modal");
    const resutlModal = document.getElementById("result-modal");
    const resultPrinter = document.getElementById("result-printer");
    const startBtn = document.getElementById("start-btn");
    const resetBtn = document.getElementById("reset-btn")
    const aiCheckbox = document.getElementById("ai-checkbox");
    const namePlayerOne = document.getElementById("name-player-one");
    const namePlayerTwo = document.getElementById("name-player-two");
    return {tiles, initialModal, resutlModal, resultPrinter, startBtn, resetBtn, aiCheckbox, namePlayerOne, namePlayerTwo}
})();

// only thing that directly interacts with dom (renders and unrenders stuff)
const renderModule = (function(){
    const renderGameBoard = () => {
        for(let i = 0; i < 9; i++){
            if(typeof(GameBoard.gameBoard[i]) !=  "number"){
                cacheDom.tiles[i].textContent = GameBoard.gameBoard[i];
            }
        }
    }
    const unrenderGameBoard = () => {
        for(let i=0; i < 9; i++){
            cacheDom.tiles[i].textContent = "";
        }
    }
    const renderElement = (modal) => {
        modal.classList.add("active");
    }
    const unrenderElement = (target) => {
        target.classList.remove("active");
    }

    const changeTextContent = (target, newContent) => {
        target.textContent = newContent;
    } 

    return {renderGameBoard, unrenderGameBoard, renderElement, unrenderElement, changeTextContent}
})();

// handles everything related to player creation
const createPlayersModule = (function(){

    const userFactory = (name, symbol, type="human") => {
        return {name, symbol, type};
    }
    
    const aiFactory = (name, symbol, type="ai") => {
        const makeRandomMove = function(){
            return (Math.floor(Math.random() * 10)); 
        }
        return {name, symbol, type, makeRandomMove}
    }

    const createPlayers = () => {
        GameObject.players.push(userFactory(cacheDom.namePlayerOne.value, "X"));
        if(cacheDom.aiCheckbox.checked == true){
            GameObject.players.push(aiFactory(cacheDom.namePlayerTwo.value, "O"));
        } else {
            GameObject.players.push(userFactory(cacheDom.namePlayerTwo.value, "O"));
        }
    }
    return {createPlayers}
})()

// clears everything 
const clearModule = (function(){
    const clearEverything = () => {
        GameBoard.gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        cacheDom.namePlayerOne.value = "";
        cacheDom.namePlayerTwo.value = "";
        cacheDom.aiCheckbox.checked = false;
        GameObject.players = [];
        GameObject.turns = 0;
    }
    return {clearEverything}
})()

// binds events to dom elements  
const binderModule = (function(){
    cacheDom.tiles.forEach(tile => tile.addEventListener("click", () => {GameObject.userTurn(tile.id)}));
    cacheDom.startBtn.addEventListener("click", () => {
        createPlayersModule.createPlayers();
        renderModule.unrenderElement(cacheDom.initialModal);
        renderModule.renderGameBoard();
        renderModule.renderElement(cacheDom.resetBtn);
    });
    cacheDom.resetBtn.addEventListener("click", () => {
        clearModule.clearEverything();
        renderModule.unrenderElement(cacheDom.resetBtn);
        renderModule.unrenderElement(cacheDom.resutlModal);
        renderModule.renderElement(cacheDom.initialModal);
        renderModule.unrenderGameBoard()
    })
})();


// object that handles the game 
const GameObject = {
    players: [],
    turns: 0,

    checkWinner: function(player){
        if (
            GameBoard.gameBoard[0] == player.symbol && GameBoard.gameBoard[1] == player.symbol && GameBoard.gameBoard[2] == player.symbol ||
            GameBoard.gameBoard[3] == player.symbol && GameBoard.gameBoard[4] == player.symbol && GameBoard.gameBoard[5] == player.symbol ||
            GameBoard.gameBoard[6] == player.symbol && GameBoard.gameBoard[7] == player.symbol && GameBoard.gameBoard[8] == player.symbol ||
            GameBoard.gameBoard[0] == player.symbol && GameBoard.gameBoard[3] == player.symbol && GameBoard.gameBoard[6] == player.symbol ||
            GameBoard.gameBoard[1] == player.symbol && GameBoard.gameBoard[4] == player.symbol && GameBoard.gameBoard[7] == player.symbol ||
            GameBoard.gameBoard[2] == player.symbol && GameBoard.gameBoard[5] == player.symbol && GameBoard.gameBoard[8] == player.symbol ||
            GameBoard.gameBoard[0] == player.symbol && GameBoard.gameBoard[4] == player.symbol && GameBoard.gameBoard[8] == player.symbol ||
            GameBoard.gameBoard[2] == player.symbol && GameBoard.gameBoard[4] == player.symbol && GameBoard.gameBoard[6] == player.symbol 
        ){
            return true;
        } else {
            return false;
        }
    },

    activePlayer: function(){   
        if(this.turns % 2 == 0){
            return this.players[0];
        } else {
            return this.players[1];
        }
    },

    userTurn: function(buttonClicked){
        if(GameBoard.getEmptyIndexes().includes(parseInt(buttonClicked))){
            GameBoard.gameBoard[buttonClicked] = this.activePlayer().symbol;
            renderModule.renderGameBoard();
            this.gameflow();
        }
    },

    aiTurn: function(){
        index = this.players[1].makeRandomMove()
        if (GameBoard.getEmptyIndexes().includes(index)){
            GameBoard.gameBoard[index] = this.players[1].symbol;
            renderModule.renderGameBoard();
            this.gameflow();
        } else{
            this.aiTurn();
        }   
    },

    gameflow: function(){
        if(this.checkWinner(this.activePlayer())){
            renderModule.changeTextContent(cacheDom.resultPrinter, `${this.activePlayer().name} Won`);
            renderModule.renderElement(cacheDom.resutlModal)   
        } 
        this.turns += 1  
        if(GameBoard.getEmptyIndexes().length == 0){
            renderModule.changeTextContent(cacheDom.resultPrinter, "Draw");
            renderModule.renderElement(cacheDom.resutlModal)  
        }
        if (this.players[1].type == "ai" && this.activePlayer() == this.players[1] && GameBoard.getEmptyIndexes().length > 0){
            this.aiTurn();
        }
    }
}
