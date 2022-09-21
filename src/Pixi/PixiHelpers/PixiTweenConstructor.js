import PixiEasings from "./PixiEasings";
import PixiTweenPosition from "./PixiTweenPosition";
import PixiTweenScale from "./PixiTweenScale";
import PixiTweenRotation from "./PixiTweenRotation";
import PixiTweenOpacity from "./PixiTweenOpacity";

class PixiTweenConstructor {
    pixiApp;
    pixiEasings = new PixiEasings();
    pixiTweens = {
        PixiTweenPosition,
        PixiTweenScale,
        PixiTweenRotation,
        PixiTweenOpacity
    }

    constructor(pixiApp) {
        this.pixiApp = pixiApp;
    }

    createTween(pixiApp, pixiObject, tweenConfig) {
        return new tweenConfig.tweenType(pixiApp, pixiObject, this.pixiEasings, tweenConfig);
    }
}

export default PixiTweenConstructor;