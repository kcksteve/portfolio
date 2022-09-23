//Manages the preloading of objects from the object definition file
//waits until done loading before any scenes can be shown
class PixiLoadingManager {
    //Ref to the pixi app
    pixiApp;
    //Ref to the pixi app manager class
    pixiAppManager;
    //Ref to the object definition file
    pixiObjects;
    //function to call when all images loaded - guards against scenes loading before objects can be constructed
    loadedCallback;

    constructor(pixiApp, pixiObjects, pixiAppManager, loadedCallback) {
        this.pixiApp = pixiApp;
        this.pixiObjects = pixiObjects
        this.pixiAppManager = pixiAppManager;
        this.loadedCallback = loadedCallback;
        this.#loadAllImages();
    }

    //Loads all images from the object definition file
    #loadAllImages() {
        this.pixiObjects.forEach(obj => {
            this.pixiApp.loader.add(obj.name, obj.image);
        });

        this.pixiApp.loader.load((loader, resources) => {
            //Pass the loaded resources to the object constructor so they can be used in creating objects
            this.pixiAppManager.pixiObjectConstructor.pixiResources = resources;
            this.loadedCallback()
        });
    }
}

export default PixiLoadingManager;