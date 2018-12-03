//this game will have only 1 state
var GameState = {

  //initiate some game-level settings
  init: function() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      
      this.scale.pageAlignHorizontally = true;
      this.scale.pageAlignVertically = true;
  },
  //load the game assets before the game starts
  preload: function() {
    this.load.image('backyard', 'assests/images/backyard.png');
      this.load.image('apple', 'assests/images/apple.png');
      this.load.image('candy', 'assests/images/candy.png');
      this.load.image('rotate', 'assests/images/rotate.png');
      this.load.image('toy', 'assests/images/toy.png');
      this.load.image('arrow', 'assests/images/arrow.png');
      this.load.spritesheet('pet', 'assets/images/pet.png', 97, 83, 5, 1,1);
  },
  //executed after everything is loaded
  create: function() {     
      this.background = this.game.add.sprite(0,0, 'backyard');
      
      this.pet = this.game.add.sprite(100, 400, 'pet');
      this.pet.anchor.setTo(0.5);
      
      
      this.pet.customParams = {health: 100, fun : 100};
      
      this.pet.inputEnabled = true;
      this.pet.input.enableDrag();
      
      this.apple = this.game.add.sprite(72, 570, 'apple');
      this.candy = this.game.add.sprite(144, 570, 'candy');
      this.toy = this.game.add.sprite(216, 570, 'toy');
      this.rotate = this.game.add.sprite(288, 570, 'rotate');
  
  },

  
};

//initiate the Phaser framework
var game = new Phaser.Game(360, 640, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');