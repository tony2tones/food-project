var HomeState = {
    create: function() {
    var background = this.game.add.sprite(0,0, 'backyard');
        background.inputEnable = true;
        
        background.events.onInputDown.add(function(){
            this.state.start('GameState');
        }, this);
    }
};