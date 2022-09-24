(function() {
    var     game = {
        // Make baord 
        gameBoard: [0, 0, 0, 1, 0, 0, 0, 0, 1],

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

    };
    game.init();
})();

