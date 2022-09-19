import PixiEasings from "./PixiEasings";

class PixiTweenConstructor {
    pixiApp;
    pixiEasings = new PixiEasings();

    constructor(pixiApp) {
        this.pixiApp = pixiApp;
    }

    createTween(pixiObject, pixiEasings, tweenConfig) {
        //return new tween(pixiApp, pixiObject, tweenConfig)
    }
}

export default PixiTweenConstructor;