

function preload() {
  // this.load.image(
  //   "bug1",
  //   "https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_1.png"
  // );
  // this.load.image(
  //   "bug2",
  //   "https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_2.png"
  // );
  // this.load.image(
  //   "bug3",
  //   "https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_3.png"
  // );
  this.load.image("fire", "assets/fire1.png");
  this.load.image("platform","../assets/platform.png");
  this.load.image("monster", "assets/image.png");
  this.load.image("wizard", "assets/wizard_right.png");
  this.load.image("castle", "assets/castle_background.jpg");
  this.load.image("myBar", "../assets/greenbar.jpg");
  this.load.image("monsterBar", "../assets/greenbar.jpg");
  this.load.image("whitebar", "../assets/whitebar.jpg");
}

const gameState = {
  score: 0
};

function create() {
  this.add.image(400, 300, "castle");
  this.player = this.physics.add.sprite(600, 200, "monster").setScale(0.5);
  this.player2 = this.physics.add
    .sprite(100, 300, "wizard")
    .setScale(0.75);

  const platforms = this.physics.add.staticGroup();

  platform1 = platforms
    .create(225, 590, "platform")
    .setScale(3, 1.5)
    .refreshBody();

  gameState.scoreText = this.add.text(330, 550, "Timer: 0", {
    fontSize: "30px",
    fill: "#000000"
  });
  this.myWhite = this.add.image(49, 549, "whitebar").setOrigin(0, 0);
  this.myWhite.displayWidth = 202;
  this.myBar = this.add.image(50, 550, "myBar").setOrigin(0, 0);
  this.myBar.displayWidth = 200;
  this.monsterWhite = this.add.image(549, 549, "whitebar").setOrigin(0, 0);
  this.monsterWhite.displayWidth = 202;
  this.monsterBar = this.add.image(550, 550, "monsterBar").setOrigin(0, 0);
  this.monsterBar.displayWidth = 200;

  this.player.setCollideWorldBounds(true);

  this.physics.add.collider(this.player, platforms);
  this.physics.add.collider(this.player2, platforms);
  gameState.cursors = this.input.keyboard.createCursorKeys();
  var fires = this.physics.add.group();

  this.physics.add.collider(fires, platforms, function(fire) {
    fire.destroy();
      // gameState.score += 10;
    gameState.scoreText.setText(`Score: ${gameState.score}`);
  });
}

function update() {
    var fires = this.physics.add.group();
    function fireGen() {
        const xCoord = Math.random() * 450 + 400;
        
        fires.create(xCoord, 10, "fire");
      }
  if (gameState.cursors.left.isDown) {
    
      const fireGenLoop = this.time.addEvent({
        delay: 100,
        callback: fireGen,
        callbackScope: this,
        repeat: 25
      });
      this.monsterBar.displayWidth -=25;
      if(this.monsterBar.displayWidth <= 0){
          console.log("hello");
          this.player.kill();
      }
  } else if (gameState.cursors.right.isDown) {
    this.player.setVelocityX(160);
  } else {
    this.player.setVelocityX(0);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "ffffff",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      enableBody: true
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);
