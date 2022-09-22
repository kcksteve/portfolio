import PixiTween from "./PixiTween";

class PixiTweenRotation extends PixiTween {
    constructor() {
        super();
    }

    updateTweenTarget() {
        if (!this.targetFrom.hasOwnProperty('x')) {
            this.currentFrom.x = this.pixiObject.angle
        }
    }

    stepTween() {

    }
}

export default PixiTweenRotation;