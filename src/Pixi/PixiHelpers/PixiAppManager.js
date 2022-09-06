import * as PIXI from 'pixi.js';
import PixiCanvasManager from "./PixiCanvasManager";
import PixiLoadingManager from "./PixiLoadingManager";
import PixiSceneManager from "./PixiSceneManager";

class PixiAppManager {
    name;
    pixiApp;
    pixiLoadingManager;
    pixiCanvasManager;
    pixiSceneManager;
    pixiObjects;
    parentElement;

    constructor(pixiObjects, parentElement, name, sizing) {
        this.pixiApp = new PIXI.Application();
        this.parentElement = parentElement;
        this.name = name;
        this.pixiCanvasManager = new PixiCanvasManager(this.pixiApp, this.parentElement, name, sizing);
        this.pixiLoadingManager = new PixiLoadingManager(this.pixiApp, pixiObjects, () => console.log('loaded'));
        this.pixiSceneManager = new PixiSceneManager();
    }
}

export default PixiAppManager;