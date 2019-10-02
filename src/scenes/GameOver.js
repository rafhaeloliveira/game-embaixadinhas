import BackgroundImg from './../assets/background.jpg';

const width = window.innerWidth;
const height = window.innerHeight;

class GameOverScene extends Phaser.Scene { 
    constructor(){
        super({
            key: 'GameOverScene'
        });
    };

    init(){};

    preload() {
        this.load.image('background', BackgroundImg);
    };

    create() {
        this.add.image(width, height, 'background').setOrigin(1, 1.05);

        this.add.text(width/4, height/4, 'Touch to replay', {fontSize: '28px', fill: '#FFFFFF'});

        this.input.on('pointerdown', () => {
            this.scene.start('GameScene');
        })
    };

    update(){};
};

export default GameOverScene;