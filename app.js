(function() {
    var     game = {
        // Make baord 
        gameBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        turns: 0,
        
        // initializes the modulez
        init: function(){
            this.cacheDom();
            this.bindEvents();
            this.render();
        },

        // Only thing that caches DOM 
        cacheDom:  function(){
            this.tiles = document.querySelectorAll(".tile")
        },

        // Binds events to dom elements 
        bindEvents: function(){
            this.tiles.forEach(tile => {
                tile.addEventListener("click", this.play);

            });
        },

        // Only thing that alters'0 the DOM itself
        render: function(){
            for (let i = 0; i < 9; i++){
                if (this.gameBoard[i] == 1){
                    this.tiles[i].textContent = "X"
                } else if (this.gameBoard[i] == -1){
                    this.tiles[i].textContent = "O";
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
        whichButtonWasClicked: function(){
            globalThis.play(this.id)
        },

        play: function(){
            console.log(this.id)
        }

    };
    game.init();
})();

