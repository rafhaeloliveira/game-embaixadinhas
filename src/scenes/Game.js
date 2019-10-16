import BackgroundImg from './../assets/background.jpg';
import BallImg from './../assets/bola.png';
import Platform from './../assets/platform.png';
import BounceSound1 from './../assets/sounds/bounce_ball_1.mp3';
import BounceSound2 from './../assets/sounds/bounce_ball_2.mp3';

import OrangeButtons from './../assets/button_orange.png';

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

        this.load.audio('sound1', BounceSound1);
        this.load.audio('sound2', BounceSound2);

        this.load.spritesheet('orange_buttons', OrangeButtons, { frameWidth: 256.7, frameHeight: 256}); 
    };

    randomBounceSound() {
        let sound;

        if(Math.floor(Math.random() * (2 - 1 + 1) + 1) > 1){
            sound = 'sound1';
        } else {
            sound = 'sound2';
        }

        return sound;
    }

    create(){
        this.add.image(width, height, 'background').setOrigin(.5, .9).setScale(.6);

        gameState.ball = this.physics.add.image(width/2, height-120, 'ball').setScale(0.25);
        gameState.ball.setOrigin(0.5, 0);
        gameState.ball.setVelocity(0, 60);
        gameState.ball.setBounce(.5, .8);
        gameState.ball.setCollideWorldBounds(true);
        gameState.ball.setInteractive();
        
        this.physics.pause();

        gameState.platforms = this.physics.add.staticGroup();
        gameState.platforms.create(160, height + 25, 'platform');

        // Inicia a física do jogo
        this.input.on('pointerdown', () => { this.physics.resume() });

        // Clique e pontuação
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

            this.sound.play(this.randomBounceSound())
        });

        this.physics.add.collider(gameState.ball, gameState.platforms, () => {
            gameState.score = 0;
            this.scene.restart();
        });

        // Score
        gameState.scoreText = this.add.text(170, 10, 'Score: 0', {fontSize: '28px', fill: '#FFFFFF'});

        // Controlls
        const pauseBtn = this.add.sprite(30, 30, 'orange_buttons', 6).setScale(.2);
        pauseBtn.setInteractive();
        pauseBtn.on('pointerdown', (pointer) => {
            this.time.addEvent({
                delay: 100,
                callback: () => {this.scene.start('MainMenu'); this.scene.pause()},
                loop: false
            })
        });
    };

    update(){

    };
}

export default GameScene;