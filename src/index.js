import Phaser from "phaser";
import logoImg from "./assets/logo.png";

import GameScene from './scenes/Game';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 320 ,
  height: 550,
  scale: {
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 1200 },
      enableBody: true,
    }
  },
  scene: [
    GameScene
  ]
};

const game = new Phaser.Game(config);