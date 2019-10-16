import OrangeButtons from './../assets/button_orange.png';
import BackgroundImg from './../assets/game-background.jpg';
import GameLogo from './../assets/game-logo.png';

const width = window.innerWidth;
const height = window.innerHeight;

class MainMenu extends Phaser.Scene {
    constructor(){
        super({ key: 'MainMenu' })
    };

    init(){};

    preload(){
        this.load.image('background', BackgroundImg);
        this.load.image('game-logo', GameLogo);
        this.load.spritesheet('orange_buttons', OrangeButtons, { frameWidth: 256.7, frameHeight: 256}); 
    }

    create() {
        this.add.image(width, height, 'background').setOrigin(.5, .9).setScale(.6);
        const logo = this.add.image(width/2 + 12, height - 400, 'game-logo').setScale(.8);
        const startBtn  = this.add.sprite((width/2 - 60), (height - 100), 'orange_buttons', 21).setScale(.4);
        const confBtn = this.add.sprite((width/2 + 60), (height - 100), 'orange_buttons', 0).setScale(.4);

        startBtn.setInteractive();
        startBtn.on('pointerdown', (pointer) => {
            startBtn.setFrame(1);
            this.time.addEvent({
                delay: 100,
                callback: () => {startBtn.setFrame(0); this.scene.pause(); this.scene.start('GameScene');},
                loop: false
            })
        });
    }
}

export default MainMenu;