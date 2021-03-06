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
  this.load.image(
    "platform",
    "https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png"
  );
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
  gameState.player = this.physics.add.sprite(600, 200, "monster").setScale(0.5);
  gameState.player2 = this.physics.add
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

  gameState.player.setCollideWorldBounds(true);

  this.physics.add.collider(gameState.player, platforms);
  this.physics.add.collider(gameState.player2, platforms);
  gameState.cursors = this.input.keyboard.createCursorKeys();
  const fires = this.physics.add.group();

  function fireGen() {
    const xCoord = Math.random() * 450 + 400;
    fires.create(xCoord, 10, "fire");
  }

  const fireGenLoop = this.time.addEvent({
    delay: 50,
    callback: fireGen,
    callbackScope: this,
    repeat: 100
  });

  this.physics.add.collider(fires, platforms, function(fire) {
    fire.destroy();
      // gameState.score += 10;
    gameState.scoreText.setText(`Score: ${gameState.score}`);
  });

  //   this.physics.add.collider(gameState.player, bugs, () => {
  //     bugGenLoop.destroy();
  //     this.physics.pause();
  //     this.add.text(180, 250, "Game Over", { fontSize: "15px", fill: "#000000" });
  //     this.add.text(152, 270, "Click to Restart", {
  //       fontSize: "15px",
  //       fill: "#000000"
  //     });

  // // Add your code below:
  // this.input.on("pointerup", () => {
  //   gameState.score = 0;
  //   this.scene.restart();
  // });
  //   });
}

function update() {
  if (gameState.cursors.left.isDown) {
    gameState.player.setVelocityX(-160);
  } else if (gameState.cursors.right.isDown) {
    gameState.player.setVelocityX(160);
  } else {
    gameState.player.setVelocityX(0);
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
