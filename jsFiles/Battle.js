const gameState = {
    score: 0
  };
  let answer;
  
  
class Battle extends Phaser.Scene{

    constructor(){
        super({key: "Battle"})
    }
    
    preload(){
        // this.load.json('question', renderQuestion());
        this.load.image("fire", "assets/fire1.png");
        this.load.image("platform","../assets/platform.png");
        this.load.image("monster", "assets/image.png");
        this.load.image("wizard", "assets/wizard_right.png");
        this.load.image("castle", "assets/castle_background.jpg");
        this.load.image("myBar", "../assets/greenbar.jpg");
        this.load.image("monsterBar", "../assets/greenbar.jpg");
        this.load.image("whitebar", "../assets/whitebar.jpg");
        
        
    }
    
    
    create(){ 
      const renderQuestionBoard = (question)=>{
        this.question = this.make.text({
          x: 200,
          y: 100,
          text: question.question,
          origin: { x: 0.5, y: 0.5 },
          style: {
              font: 'bold 20px Arial',
              fill: 'white',
              wordWrap: { width: 300 },
              align: 'center' 
          }
      });
      this.answer1 = this.make.text({
        x: 200,
        y: 175,
        text: "1. " + question.answer1,
        origin: { x: 0.5, y: 0.5 },
        style: {
            font: 'bold 20px Arial',
            fill: 'blue',
        }
      });
      this.answer1.setInteractive();
      
      this.answer2 = this.make.text({
        x: 200,
        y: 200,
        text: "2. " + question.answer2,
        origin: { x: 0.5, y: 0.5 },
        style: {
            font: 'bold 20px Arial',
            fill: 'blue',
        }
    });
      this.answer3 = this.make.text({
        x: 200,
        y: 225,
        text: "3. " + question.answer3,
        origin: { x: 0.5, y: 0.5 },
        style: {
            font: 'bold 20px Arial',
            fill: 'blue',
        }
    });
    this.answer4 = this.make.text({
      x: 200,
      y: 250,
      text: "4. " + question.answer4,
      origin: { x: 0.5, y: 0.5 },
      style: {
          font: 'bold 20px Arial',
          fill: 'blue',
      } 
    });
    answer = question.answer
  }
  const renderQuestion = ()=>{
    // ${Math.floor(Math.random() * 17) + 1 }
      return fetch(`http://localhost:3000/questions/1`).then(resp =>resp.json()).then(question => renderQuestionBoard(question))
  }
  
    

  
    console.log(renderQuestion())

    this.add.image(400, 300, "castle");
    this.player = this.physics.add.sprite(600, 200, "monster").setScale(0.5);
    this.player2 = this.physics.add
      .sprite(100, 300, "wizard")
      .setScale(0.75);
  
    const platforms = this.physics.add.staticGroup();
  
    var platform1 = platforms
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

  update() {

    const fire = () =>{
      var fires = this.physics.add.group();
      function fireGen() {
          const xCoord = Math.random() * 450 + 400;
          
          fires.create(xCoord, 10, "fire");
      }

      const fireGenLoop = this.time.addEvent({
        delay: 100,
        callback: fireGen,
        callbackScope: this,
        repeat: 25
    });

    }
    
    // this.input.on('pointerdown', ()=> fire);

    if(answer ===1){
      this.answer1.on('pointerdown', () => {
        // console.log("hello")
      })

    }



      
  }
}

export default Battle