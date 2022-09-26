// only thing that caches stuff from the dom 
const cacheDom = (function() {
    const tiles = document.querySelectorAll(".tile")
    return {tiles}
})()


// Player factory
const playerFactory = (name, number, symbol) => {
    return {name, number, symbol, getNameWithSymbol};
};

// Create players 
const Patrick = playerFactory("Patrick", 1, "X");
const Daemon = playerFactory("Daemon", 2, "O");

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

    // determine wwhether an X or an O is to be placed 
    let determineSymbol = function(){
        if(turns % 2 == 0){
            symbol = Patrick.symbol;
        } else {
            symbol = Daemon.symbol;
        }
        turns += 1; 
        return symbol;
    };

    // determines if someone has won 
    let winner = function(){
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
                gameBoardModule.gameBoard[element.id] = determineSymbol();
                renderModule.render()
                if(winner() == true){
                    console.log("winner")
                }
            }
        })
    }); 
})()
