class PixiLoadingManager {
    pixiApp;
    pixiObjects;
    loadedCallback;

    constructor(pixiApp, pixiObjects, loadedCallback) {
        this.pixiApp = pixiApp;
        this.pixiObjects = pixiObjects
        this.loadedCallback = loadedCallback;
        this.#loadAllImages();
    }

    #loadAllImages() {
        this.pixiObjects.forEach(obj => {
            this.pixiApp.loader.add(obj.name, obj.image);
        });

        this.pixiApp.loader.load(this.loadedCallback());
    }
}

export default PixiLoadingManager;