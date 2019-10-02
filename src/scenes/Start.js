import BackgroundImg from './../assets/background.jpg';
import GameScene from './Game';

const width = window.innerWidth;
const height = window.innerHeight;

class StartScene extends Phaser.Scene { 
    constructor(){
        super({
            key: 'StartScene'
        });
    };

    init(){};

    preload() {
        this.load.image('background', BackgroundImg);
    };

    create() {
        this.add.image(width, height, 'background').setOrigin(1, 1.05);

        this.add.text(width/4, height/4, 'Touch to play', {fontSize: '28px', fill: '#FFFFFF'});

        this.input.on('pointerdown', () => {
            this.scene.start('GameScene');
        })
    };

    update(){};
};

export default StartScene;