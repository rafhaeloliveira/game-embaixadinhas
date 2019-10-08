import PlayButton from './../assets/Button.png'

class MainMenu extends Phaser.Scene {
    constructor(){
        super({ key: 'MainMenu' })
    };

    init(){};

    preload(){
        this.load.spritesheet('playButton', PlayButton, {frameWidth: 135, frameHeight: 65});
    }

    create() {
        this.physics.add.sprite(200, 300, 'playButton', 0).setOrigin(1, 1);
    }
}

export default MainMenu;