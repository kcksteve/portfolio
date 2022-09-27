import PixiEasings from "./PixiEasings";

//Creates tween objects from the configuration passed from the object constructor
class PixiTweenConstructor {
    pixiApp;
    pixiEasings = new PixiEasings();

    constructor(pixiApp) {
        this.pixiApp = pixiApp;
    }

    createTween(pixiApp, pixiObject, tweenConfig) {
        return new tweenConfig.tweenType(pixiApp, pixiObject, this.pixiEasings, tweenConfig);
    }
}

export default PixiTweenConstructor;