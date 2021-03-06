import Phaser from "phaser";

import MainMenu from './scenes/MainMenu';
import GameScene from './scenes/Game';
import StartScene from "./scenes/Start";
import GameOverScene from "./scenes/GameOver";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: window.innerWidth ,
  height: window.innerHeight,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1200 },
      enableBody: true,
    }
  },
  scene: [
    MainMenu,
    StartScene,
    GameScene,
    GameOverScene
  ]
};

const game = new Phaser.Game(config);