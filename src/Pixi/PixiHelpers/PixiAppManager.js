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

    constructor(pixiObjects, parentElement, name, sizing, scenes) {
        this.pixiApp = new PIXI.Application();
        this.parentElement = parentElement;
        this.name = name;
        this.pixiCanvasManager = new PixiCanvasManager(this.pixiApp, this.parentElement, name, sizing);
        this.pixiLoadingManager = new PixiLoadingManager(this.pixiApp, pixiObjects, () =>
        this.pixiSceneManager = new PixiSceneManager(this.pixiApp, scenes));
    }
}

export default PixiAppManager;