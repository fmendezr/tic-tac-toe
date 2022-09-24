(function() {
    var     game = {
        // Make baord 
        gameBoard: [0, 0, 0, 1, 0, 0, 0, 0, 1],
        turns: 0,

        // Init 
        init: function(){
            this.render()
        },

        // Render
        render: function(){
            const tiles = document.querySelectorAll(".tile")
            for (let i = 0; i < 9; i++){
                if (this.gameBoard[i] != 0){
                    tiles[i].textContent = "X";
                }
            }
        },

        // determine whether it's X or O turn  
        WhosTurn: function(){
            if (this.turns % 2 == 1){
                return 1;
            } else if (this.turns % 2 == 0){
                return -1;
            }
        },

    };
    game.init();
})();

