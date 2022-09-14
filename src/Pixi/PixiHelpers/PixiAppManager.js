import * as PIXI from 'pixi.js';
import PixiCanvasManager from "./PixiCanvasManager";
import PixiLoadingManager from "./PixiLoadingManager";
import PixiSceneManager from "./PixiSceneManager";
import PixiObjectConstructor from './PixiObjectConstructor';

class PixiAppManager {
    name;
    pixiApp;
    pixiLoadingManager;
    pixiCanvasManager;
    pixiSceneManager;
    pixiObjectConstructor;
    parentElement;

    constructor(pixiObjects, parentElement, name, sizing, scenes) {
        this.pixiApp = new PIXI.Application();
        this.parentElement = parentElement;
        this.name = name;
        this.pixiCanvasManager = new PixiCanvasManager(this.pixiApp, this.parentElement, name, sizing);
        this.pixiObjectConstructor = new PixiObjectConstructor(pixiObjects);
        this.pixiLoadingManager = new PixiLoadingManager(this.pixiApp, pixiObjects, this, () =>
        this.pixiSceneManager = new PixiSceneManager(this.pixiApp, this.pixiObjectConstructor, scenes)
        );
    }
}

export default PixiAppManager;