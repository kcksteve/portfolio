import PixiScene from "../PixiHelpers/PixiScene";
import * as PIXI from 'pixi.js';

class StarfieldScene extends PixiScene {
    name = 'starfield';
    container;
    isDefault = true;
    isLoaded;
    sceneManager;

    constructor(sceneManager) {
        super(sceneManager);
    }

    load(parent) {
        super.load(parent);
        console.log('loaded');
    }

    unload() {
        super.unload();
    }
}

export default StarfieldScene;