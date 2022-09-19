import PixiTween from "./PixiTween";

class PixiTweenRotation extends PixiTween {
    constructor() {
        super();
    }

    updateTweenTarget() {
        if (!this.targetFrom.hasOwnProperty('x')) {
            this.currentFrom.x = this.pixiObject.position.x
        }
        if (!this.targetFrom.hasOwnProperty('y')) {
            this.currentFrom.y = this.pixiObject.position.y
        }
    }

    stepTween() {

    }
}

export default PixiTweenRotation;