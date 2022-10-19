//Manages the diffent scenes in a pixi app
//Load, Unload and change between differnt scenes
class PixiSceneManager {
    pixiAppManager;
    pixiApp;
    pixiObjectConstructor;
    scenes = [];

    constructor(pixiAppManager, pixiApp, pixiObjectConstructor, scenes) {
        this.pixiAppManager = pixiAppManager;
        this.pixiApp = pixiApp;
        this.pixiObjectConstructor = pixiObjectConstructor;

        scenes.forEach(scene => {
            this.scenes.push(new scene(this, pixiObjectConstructor));
        });

        this.scenes.find(scene =>
            scene.isDefault === true
        ).load(this.pixiApp.stage);
    }

    //Unload any active scenes and load the specified scenes
    changeScene(sceneName) {
        this.scenes.forEach(scene => {
            if (scene.isLoaded) {
                scene.unload();
            }
        });

        this.loadScene(sceneName);
    }

    //Load a scene by its name
    loadScene(sceneName) {
        this.scenes.find(scene =>
            scene.name === sceneName
        ).load(this.pixiApp.stage);
    }

    //Unload a scene by its name
    unloadScene(sceneName) {
        this.scenes.find(scene =>
            scene.name === sceneName && scene.isLoaded
        ).unload(this.pixiApp.stage);
    }
}

export default PixiSceneManager