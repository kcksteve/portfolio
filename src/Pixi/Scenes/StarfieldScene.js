import PixiObjectConstructor from "../PixiHelpers/PixiObjectConstructor";
import PixiScene from "../PixiHelpers/PixiScene";
import * as PIXI from 'pixi.js';

class StarfieldScene extends PixiScene {
    name = 'starfield';
    isDefault = true;

    constructor(sceneManager, pixiObjects) {
        super(sceneManager, pixiObjects);
    }

    load(parent) {
        super.load(parent);
        this.pixiObjectConstructor.constructById(0, this.container);
    }

    unload() {
        super.unload();
    }
}

export default StarfieldScene;