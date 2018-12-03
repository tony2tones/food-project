//this game will have only 1 state
var GameState = {

  //initiate some game-level settings
  
  //load the game assets before the game starts
 
  //executed after everything is loaded
  create: function() {      
    this.background = this.game.add.sprite(0, 0, 'backyard');
    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(this.placeItem, this);

    this.pet = this.game.add.sprite(100, 400, 'pet');
    this.pet.anchor.setTo(0.5);
      
    this.pet.animations.add('faces', [1,2,3,2,1], 7, false);

    //custom properties
    this.pet.customParams = {health: 100, fun: 100};

    //draggable pet
    this.pet.inputEnabled = true;
    this.pet.input.enableDrag();

    this.apple = this.game.add.sprite(72, 570, 'apple');
    this.apple.anchor.setTo(0.5);
    this.apple.inputEnabled = true;
    this.apple.customParams = {health: 20};
    this.apple.events.onInputDown.add(this.pickItem, this);

    this.candy = this.game.add.sprite(144, 570, 'candy');
    this.candy.anchor.setTo(0.5);
    this.candy.inputEnabled = true;
    this.candy.customParams = {health: -10, fun: 10};
    this.candy.events.onInputDown.add(this.pickItem, this);

    this.toy = this.game.add.sprite(216, 570, 'toy');
    this.toy.anchor.setTo(0.5);
    this.toy.inputEnabled = true;
    this.toy.customParams = {fun: 20};
    this.toy.events.onInputDown.add(this.pickItem, this);

    this.rotate = this.game.add.sprite(288, 570, 'rotate');
    this.rotate.anchor.setTo(0.5);
    this.rotate.inputEnabled = true;
    this.rotate.events.onInputDown.add(this.rotatePet, this);

    this.buttons = [this.apple, this.candy, this.toy, this.rotate];

    //nothing is selected
    this.selectedItem = null;

    //the user interface (UI) is not blocked at the start
    this.uiBlocked = false;
    
    var style = { font: '20px Arial', fill: '#fff'};
    this.game.add.text(10, 20, 'health:', style);
    this.game.add.text(140, 20, 'fun', style);
    
    this.healthText = this.game.add.text(80, 20, '', style);
    this.funText = this.game.add.text(185, 20, '', style);
    this.refreshStat();
      
    this.statsDecreaser = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.reduceProperties, this);

  },
  pickItem: function(sprite, event) {
    
    //if the UI is blocked we can't pick an item
    if(!this.uiBlocked) {
      console.log('pick item');

      this.clearSelection();

      //alpha to indicate selection
      sprite.alpha = 0.4;

      this.selectedItem = sprite;
    }
  },
  rotatePet: function(sprite, event) {

    if(!this.uiBlocked) {     

      //we want the user interface (UI) to be blocked until the rotation ends
      this.uiBlocked = true;

      this.clearSelection();

      //alpha to indicate selection
      sprite.alpha = 0.4;

      var petRotation = this.game.add.tween(this.pet);

      //make the pet do two loops
      petRotation.to({angle: '+720'}, 1000);

      petRotation.onComplete.add(function(){
        //release the UI
        this.uiBlocked = false;

        sprite.alpha = 1;

        //increse the fun of the pet
        this.pet.customParams.fun += 10;
        this.refreshStat();
          
      }, this);

      //start the tween animation
      petRotation.start();
    }

    
  },
  clearSelection: function() {

    //remove transparency from all buttons
    this.buttons.forEach(function(element, index){
      element.alpha = 1;
    });

    //we are not selecting anything now
    this.selectedItem = null;
  },
  placeItem: function(sprite, event) {

    if(this.selectedItem && !this.uiBlocked) {
      var x = event.position.x;
      var y = event.position.y;

      var newItem = this.game.add.sprite(x, y, this.selectedItem.key);
      newItem.anchor.setTo(0.5);
      newItem.customParams = this.selectedItem.customParams;


      //move the pet towards the item
      var petMovement = this.game.add.tween(this.pet);
      petMovement.to({x: x, y: y}, 700);
      petMovement.onComplete.add(function(){
        //destroy the apple/candy/duck
        newItem.destroy();
          
        this.pet.animations.play('faces');

        //release the ui
        this.uiBlocked = false;

        var stat;
        for(stat in newItem.customParams) {
          //we only want the properties of the customParams object, not properties that may existing in customParams.prototype
          //this filters out all non-desired properties
          if(newItem.customParams.hasOwnProperty(stat)) {
            this.pet.customParams[stat] += newItem.customParams[stat];
          }
        }
          
          this.refreshStat();
      }, this);

      //start the tween animation
      petMovement.start();
    }
    
  },
    refreshStat: function() {
        this.healthText.text = this.pet.customParams.health;
        this.funText.text = this.pet.customParams.fun;

    },
    reduceProperties: function() {
        this.pet.customParams.health -= 10;
        this.pet.customParams.fun -= 15;
        this.refreshStat();
    },
    update: function() {
        if(this.pet.customParams.health <= 0 || this.pet.customParams.fun <= 0) {
            this.pet.frame = 4;
            this.uiBlocked = true;
             var style = { font: '38px Arial', fill: '#FF0000'};
            this.game.add.text(10, 150, 'GAME OVER BRAH', style);
    
            this.gameOverTxt = this.game.add.text(80, 20, '', style);
            
            this.game.time.events.add(2000, this.gameOver, this);
            
        }
    },
    gameOver: function() {
        this.game.state.restart();
    }
    
  
};