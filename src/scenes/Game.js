import BackgroundImg from './../assets/background.jpg';
import BallImg from './../assets/bola.png';
import Platform from './../assets/platform.png';

const gameState = { score: 0 };

class GameScene extends Phaser.Scene {
    constructor(){
        super({
            key: 'GameScene'
        });
    }

    init(){};

    preload(){
        this.load.image('background', BackgroundImg);
        this.load.image('ball', BallImg);
        this.load.image('platform', Platform);
    };

    create(){        
        this.add.image(320, 768, 'background').setOrigin(1, 1);

        gameState.ball = this.physics.add.image(100, 100, 'ball').setScale(0.15);
        gameState.ball.setOrigin(0.5, 0);
        gameState.ball.setVelocity(0, 60);
        gameState.ball.setBounce(.5, .8);
        gameState.ball.setCollideWorldBounds(true);

        gameState.platforms = this.physics.add.staticGroup();
        gameState.platforms.create(160, 565, 'platform');

        this.physics.add.collider(gameState.ball, gameState.platforms);
    };

    update(){
        
    };
}

export default GameScene;