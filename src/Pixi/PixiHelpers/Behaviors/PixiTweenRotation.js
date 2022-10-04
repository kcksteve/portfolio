import PixiTween from "./PixiTween";

//Tween for roation in degrees
class PixiTweenRotation extends PixiTween {
    constructor(pixiApp, pixiObject, pixiEasings, tweenConfig) {
        super(pixiApp, pixiObject, pixiEasings, tweenConfig);
    }

    //Called before the start of the animation to refresh the start/end values for animations
    updateTweenTarget() {
        if (this.targetFrom.x === null && this.targetTo.x !== null) {
            this.currentFrom.x = this.pixiObject.angle;
            this.currentTo.x = this.pixiObject.angle + this.targetTo.x;
        }
        else if (this.targetFrom.x !== null && this.targetTo.x !== null) {
            this.currentFrom.x = this.targetFrom.x;
            this.currentTo.x = this.targetTo.x;
        }
    }

    //Called each frame to step the tween forward
    stepTween() {
        if (this.isPlaying) {
            if (this.progress + this.pixiApp.ticker.deltaMS < this.runtimeTotal) {
                this.progress += this.pixiApp.ticker.deltaMS;
            }
            else {
                this.progress = this.runtimeTotal;
            }

            if (this.progress >= this.startDelay) {
                this.updateProgressAnimation();

                if (this.currentTo.x !== null) {
                    const deltaX = this.currentTo.x - this.currentFrom.x;
                    this.pixiObject.angle = this.currentFrom.x + deltaX * this.easing(this.progressAnimation);
                }
            }

            if (this.progress >= this.runtimeTotal) {
                this.onFinished();
            }
        }
    }
}

export default PixiTweenRotation;