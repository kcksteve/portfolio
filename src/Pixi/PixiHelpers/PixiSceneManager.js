class PixiSceneManager {
    pixiApp;
    scenes = [];

    constructor(pixiApp, scenes) {
        this.pixiApp = pixiApp;

        scenes.forEach(scene => {
            this.scenes.push(new scene(this));
        });

        this.scenes.find(scene =>
            scene.isDefault === true
        ).load(this.pixiApp.stage);
    }

    changeScene(sceneName) {
        this.scenes.forEach(scene => {
            if (scene.isLoaded) {
                scene.unload();
            }
        });

        this.loadScene(sceneName);
    }

    loadScene(sceneName) {
        this.scenes.find(scene =>
            scene.name === sceneName
        ).load(this.pixiApp.stage);
    }

    unloadScene(sceneName) {
        this.scenes.find(scene =>
            scene.name === sceneName && scene.isLoaded
        ).unload(this.pixiApp.stage);
    }
}

export default PixiSceneManager