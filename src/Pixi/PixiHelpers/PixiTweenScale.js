import PixiTween from "./PixiTween";

class PixiTweenScale extends PixiTween {
    constructor() {
        super();
    }

    updateTweenTarget() {
        if (!this.targetFrom.hasOwnProperty('x')) {
            this.currentFrom.x = this.pixiObject.scale.x
        }
        if (!this.targetFrom.hasOwnProperty('y')) {
            this.currentFrom.y = this.pixiObject.scale.y
        }
    }

    stepTween() {

    }
}

export default PixiTweenScale;