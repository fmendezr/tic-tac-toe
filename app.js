(function() {
    var     game = {
        // Make baord 
        gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        turns: 0,

        // initializes the module
        init: function(){
            this.cacheDom();
            this.bindEvents();
            this.render();
        },

        // Only thing that caches DOM 
        cacheDom:  function(){
            this.tiles = document.querySelectorAll(".tile")
        },

        // Only thing that touches the DOM itself
        bindEvents: function(){
            this.tiles.forEach(tile => {
                tile.addEventListener("click", this.play.bind(this));
            });
        },

        // Only part of 
        render: function(){
            for (let i = 0; i < 9; i++){
                if (this.gameBoard[i] != 0){
                    this.tiles[i].textContent = "X";
                }
            }
        },

        // determine whether it's X or O turn  
        whosTurn: function(){
            if (this.turns % 2 == 1){
                return 1;
            } else if (this.turns % 2 == 0){
                return -1;
            }
        },

        // add button listners to play
        play: function(){
            console.log(this.gameBoard)
        }
    };
    game.init();
})();

