import { Container } from 'pixi.js';
import * as PIXI from 'pixi.js';


class PixiScene {
    name;
    container;
    isDefault = false;
    isLoaded;
    sceneManager;
    pixiObjectConstructor;

    constructor(sceneManager, pixiObjectConstructor) {
        this.sceneManager = sceneManager;
        this.pixiObjectConstructor = pixiObjectConstructor;
        this.isLoaded = false;
    }

    load(parent) {
        this.container = new Container();
        parent.addChild(this.container);
        this.isLoaded = true;
    }

    unload() {
        this.container.destroy();
    }
}

export default PixiScene;