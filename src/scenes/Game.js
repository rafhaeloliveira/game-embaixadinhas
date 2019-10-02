import BackgroundImg from './../assets/background.jpg';
import BallImg from './../assets/bola.png';
import Platform from './../assets/platform.png';
import { timingSafeEqual } from 'crypto';

const gameState = { score: 0 };

const width = window.innerWidth;
const height = window.innerHeight;

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

    playGame(){

    }

    create(){        
        this.add.image(width, height, 'background').setOrigin(1, 1.05);

        gameState.ball = this.physics.add.image(width/2, height-200, 'ball').setScale(0.25);
        gameState.ball.setOrigin(0.5, 0);
        gameState.ball.setVelocity(0, 60);
        gameState.ball.setBounce(.5, .8);
        gameState.ball.setCollideWorldBounds(true);
        gameState.ball.setInteractive();

        gameState.platforms = this.physics.add.staticGroup();
        gameState.platforms.create(160, height-10, 'platform');

        // this.physics.add.collider(gameState.ball, gameState.platforms);

        gameState.ball.on('pointerdown', (pointer, localX, localY) => {
            let diff = 0;

            if(gameState.ball.x < localX){
                diff = localX - gameState.ball.x;
                gameState.ball.setVelocityX(-10 * diff);
            } else if(gameState.ball.x > localX){
                diff = gameState.ball.x - localX;
                gameState.ball.setVelocityX(10* diff);
            } else {
                gameState.ball.setVelocityX(2 + Math.random() * 8);
            }

            gameState.ball.setVelocityY(-600);

            gameState.score += 1;

            gameState.scoreText.setText(`Score: ${gameState.score}`);
        });

        this.physics.add.collider(gameState.ball, gameState.platforms, () => {
            this.scene.start('GameOverScene');
        });

        // Score
        gameState.scoreText = this.add.text(170, 10, 'Score: 0', {fontSize: '28px', fill: '#FFFFFF'});
    };

    update(){

    };
}

export default GameScene;