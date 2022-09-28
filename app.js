// only thing that caches stuff from the dom 
const cacheDom = (function() {
    const tiles = document.querySelectorAll(".tile");
    const resetBtn = document.getElementById("resetBtn");
    const resultModal = document.getElementById("result-modal");
    const textResultModal = document.getElementById("result-printer");
    const playerNames = document.querySelectorAll(".name");
    const initialModal = document.getElementById("initial-modal");
    const startBtn = document.getElementById("startBtn");
    return {tiles, resetBtn, resultModal, textResultModal, playerNames, initialModal, startBtn}
})()


// Player factory
const playerFactory = (name, number, symbol) => {
    return {name, number, symbol, changeName(newName){
        this.name = newName;
        return this;
    }};
};

// Create Players 
const Patrick = playerFactory('Patrick', 1, "X");
const Driver = playerFactory("Driver", 2, "O");

// Game board module object 
let  gameBoardModule =  (function() {
    let gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    return {gameBoard}
})();

// only thing that alters the dom
let renderModule = (function() {
    render = function(){
        for(let i = 0; i < 9; i++){
            if(gameBoardModule.gameBoard[i] != 0){
                cacheDom.tiles[i].textContent = gameBoardModule.gameBoard[i];
            } 
        }
    }
    return{render};
})();

// Game module that handles flow of the game
let game = (function() {
    turns = 0;

    //create players 
    cacheDom.startBtn.addEventListener("click", () => {
        Patrick.changeName(cacheDom.playerNames[0].value);
        Driver.changeName(cacheDom.playerNames[1].value);
        cacheDom.initialModal.classList.remove("active");
        cacheDom.resetBtn.classList.add("active");
    })

    // restart everything

    // determine wwhether an X or an O is to be placed 
    const determineTurn = function(){
        if(turns % 2 == 0){
            player = Patrick;
        } else {
            player = Driver;
        }
        turns += 1; 
        return player;
    };

    // determines if someone has won 
    const winner = function(){
        combinations = [
                      [cacheDom.tiles[0].textContent, cacheDom.tiles[1].textContent, cacheDom.tiles[2].textContent], 
                      [cacheDom.tiles[3].textContent, cacheDom.tiles[4].textContent, cacheDom.tiles[5].textContent], 
                      [cacheDom.tiles[6].textContent, cacheDom.tiles[7].textContent, cacheDom.tiles[8].textContent], 
                      [cacheDom.tiles[0].textContent, cacheDom.tiles[3].textContent, cacheDom.tiles[6].textContent], 
                      [cacheDom.tiles[1].textContent, cacheDom.tiles[4].textContent, cacheDom.tiles[7].textContent], 
                      [cacheDom.tiles[2].textContent, cacheDom.tiles[5].textContent, cacheDom.tiles[8].textContent], 
                      [cacheDom.tiles[0].textContent, cacheDom.tiles[4].textContent, cacheDom.tiles[8].textContent],
                      [cacheDom.tiles[6].textContent, cacheDom.tiles[4].textContent, cacheDom.tiles[2].textContent]
                      ];
      arr = [];
      for(let i = 0; i < combinations.length; i++){
          arr.push(combinations[i].every(element => element == combinations[i][0] && combinations[i][0] != 0));
      }
      return arr.some(element => element == true)
    };

    // places x or y on empty tiles  
    cacheDom.tiles.forEach(element => {
        element.addEventListener("click", () => {
            if(gameBoardModule.gameBoard[element.id] == 0){
                gameBoardModule.gameBoard[element.id] = determineTurn().symbol;
                renderModule.render()
                if(winner() == true){
                    turns -= 1;
                    cacheDom.textResultModal.textContent = `${determineTurn().name} Won`;
                    cacheDom.resultModal.classList.add("active");
                }
                if(turns == 9){
                    cacheDom.textResultModal.textContent = "Draw";
                    cacheDom.resultModal.classList.add("active");
                }
            }
        })
    });
})()