import BackgroundImg from './../assets/background.jpg';
import BallImg from './../assets/bola.png';
import Platform from './../assets/platform.png';
import { timingSafeEqual } from 'crypto';

const gameState = { score: 0 };

class GameScene extends Phaser.Scene {
    constructor(){
        super({
            key: 'GameScene'
        });
    }

    hitBall(){

    };

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
        gameState.ball.setInteractive();

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
        })

        gameState.platforms = this.physics.add.staticGroup();
        gameState.platforms.create(160, 565, 'platform');

        this.physics.add.collider(gameState.ball, gameState.platforms, () => {
            this.physics.pause();
            this.add.text(80, 200, 'Game Over', { fontSize: '28px', fill: '#FFFFFF'});
            this.add.text(80, 230, 'Toque a tela', { fontSize: '21px', fill: '#FFFFFF'});
            this.add.text(70, 250, 'para reiniciar', { fontSize: '21px', fill: '#FFFFFF'});

            this.input.on('pointerup', () => {
                gameState.score = 0;
                this.scene.restart();
            });
        });

        // Score
        gameState.scoreText = this.add.text(170, 10, 'Score: 0', {fontSize: '28px', fill: '#FFFFFF'});
    };

    update(){

    };
}

export default GameScene;