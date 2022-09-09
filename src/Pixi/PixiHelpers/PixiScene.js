import { Container } from 'pixi.js';

class PixiScene {
    name;
    container;
    isDefault = false;
    isLoaded;
    sceneManager;

    constructor(sceneManager) {
        this.sceneManager = sceneManager;
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