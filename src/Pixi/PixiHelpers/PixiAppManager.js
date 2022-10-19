import * as PIXI from 'pixi.js';
import PixiCanvasManager from "./PixiCanvasManager";
import PixiLoadingManager from "./PixiLoadingManager";
import PixiSceneManager from "./PixiSceneManager";
import PixiObjectConstructor from './PixiObjectConstructor';
import PixiTweenConstructor from './Behaviors/PixiTweenConstructor';

//Creates the base pixi app and supporting classes in required order
class PixiAppManager {
    name;
    pixiApp;
    pixiLoadingManager;
    pixiCanvasManager;
    pixiSceneManager;
    pixiObjectConstructor;
    pixiTweenConstructor;
    interposerObject;
    parentElement;

    constructor(pixiObjects, parentElement, name, sizing, scenes, interposer) {
        this.pixiApp = new PIXI.Application();
        this.parentElement = parentElement;
        this.name = name;
        this.interposerObject = interposer;
        this.pixiCanvasManager = new PixiCanvasManager(this.pixiApp, this.parentElement, name, sizing);
        this.pixiTweenConstructor = new PixiTweenConstructor(this.pixiApp);
        this.pixiObjectConstructor = new PixiObjectConstructor(this.pixiApp, pixiObjects, this.pixiTweenConstructor);
        this.pixiLoadingManager = new PixiLoadingManager(this.pixiApp, pixiObjects, this, () =>
        this.pixiSceneManager = new PixiSceneManager(this, this.pixiApp, this.pixiObjectConstructor, scenes)
        );
    }
}

export default PixiAppManager;