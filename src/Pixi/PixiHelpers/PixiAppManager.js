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
    howlManager;

    constructor(pixiAppConfig) {
        try {
            this.pixiApp = new PIXI.Application();

            if (pixiAppConfig.hasOwnProperty('name')) {
                this.name = pixiAppConfig.name;
            } else {
                this.name = 'none';
            }

            if (pixiAppConfig.hasOwnProperty('parentElement')) {
                this.parentElement = pixiAppConfig.parentElement;
            } else {
                throw new Error('Parent element property not found.');
            }

            if (pixiAppConfig.hasOwnProperty('interposer')) {
                this.interposerObject = pixiAppConfig.interposer;
            } else {
                this.interposerObject = null;
            }

            if (pixiAppConfig.hasOwnProperty('canvasSettings')) {
                this.pixiCanvasManager = new PixiCanvasManager(this.pixiApp, this.parentElement, this.name, pixiAppConfig.canvasSettings);
            } else {
                throw new Error('Canvas setting property not found.');
            }

            this.pixiTweenConstructor = new PixiTweenConstructor(this.pixiApp);

            if (pixiAppConfig.hasOwnProperty('pixiObjects')) {
                this.pixiObjectConstructor = new PixiObjectConstructor(this.pixiApp, pixiAppConfig.pixiObjects, this.pixiTweenConstructor);
            } else {
                throw new Error('Pixi objects property not found.');
            }

            if (pixiAppConfig.hasOwnProperty('howlManager')) {
                this.howlManager = pixiAppConfig.howlManager;
                this.howlManager.onLoaded = () => this.onLoaded();
            } else {
                this.howlManager = null;
            }

            if (pixiAppConfig.hasOwnProperty('scenes')) {
                this.pixiSceneManager = new PixiSceneManager(this, this.pixiApp, this.pixiObjectConstructor, pixiAppConfig.scenes);
            } else {
                throw new Error('Scenes property not found.');
            }

            this.pixiLoadingManager = new PixiLoadingManager(this.pixiApp, pixiAppConfig.pixiObjects, this, () => this.onLoaded());
        } catch(e) {
            console.error(e);
        }
    }

    //Called by the loading manager and the howlManager to indicate loading complete. Loads default scene.
    onLoaded() {
        if (this.pixiLoadingManager.isLoaded && !this.howlManager) {
            this.pixiSceneManager.loadDefaultScene();
        }
        else if (this.pixiLoadingManager.isLoaded && this.howlManager && this.howlManager.isLoaded) {
            this.pixiSceneManager.loadDefaultScene();
        }
    }
}

export default PixiAppManager;