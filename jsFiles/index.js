
import MainScreen from './MainScreen.js';
import Battle from './Battle.js';


// const MainScreen =  new MainScreen();
document.addEventListener('DOMContentLoaded', ()=>{
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
  scene: [MainScreen, Battle]
  };
  const game = new Phaser.Game(config);
})

