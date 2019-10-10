import PlayButton from './../assets/Button.png';

const width = window.innerWidth;
const height = window.innerHeight;

class MainMenu extends Phaser.Scene {
    constructor(){
        super({ key: 'MainMenu' })
    };

    init(){};

    preload(){
        this.load.spritesheet('playbtn', PlayButton, { frameWidth: 417, frameHeight: 181});
    }

    create() {
        this.add.sprite(width/2, height/2, 'playbtn', 0).setScale(.5);
    }
}

export default MainMenu;