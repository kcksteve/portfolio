class PixiLoadingManager {
    pixiApp;
    pixiAppManager;
    pixiObjects;
    loadedCallback;

    constructor(pixiApp, pixiObjects, pixiAppManager, loadedCallback) {
        this.pixiApp = pixiApp;
        this.pixiObjects = pixiObjects
        this.pixiAppManager = pixiAppManager;
        this.loadedCallback = loadedCallback;
        this.#loadAllImages();
    }

    #loadAllImages() {
        this.pixiObjects.forEach(obj => {
            this.pixiApp.loader.add(obj.name, obj.image);
        });

        this.pixiApp.loader.load((loader, resources) => {
            this.pixiAppManager.pixiObjectConstructor.pixiResources = resources;
            this.loadedCallback()
        });
    }
}

export default PixiLoadingManager;