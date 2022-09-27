import PixiTween from "./PixiTween";

//Tween for scale height and width
class PixiTweenScale extends PixiTween {
    constructor(pixiApp, pixiObject, pixiEasings, tweenConfig) {
        super(pixiApp, pixiObject, pixiEasings, tweenConfig);
    }

    //Called before the start of the animation to refresh the start/end values for animations
    updateTweenTarget() {
        if (this.targetFrom.x === null && this.targetTo.x !== null) {
            this.currentFrom.x = this.pixiObject.scale.x;
            this.currentTo.x = this.pixiObject.scale.x + this.targetTo.x;
        }
        else if (this.targetFrom.x !== null && this.targetTo.x !== null) {
            this.currentFrom.x = this.targetFrom.x;
            this.currentTo.x = this.targetTo.x;
        }

        if (this.targetFrom.y === null && this.targetTo.y !== null) {
            this.currentFrom.y = this.pixiObject.scale.y;
            this.currentTo.y = this.pixiObject.scale.y + this.targetTo.y;
        }
        else if (this.targetFrom.y !== null && this.targetTo.y !== null) {
            this.currentFrom.y = this.targetFrom.y;
            this.currentTo.y = this.targetTo.y;
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
                if (this.currentTo.x) {
                    const deltaX = this.currentTo.x - this.currentFrom.x;
                    this.pixiObject.scale.x = this.currentFrom.x + deltaX * this.easing((this.progress - this.startDelay) / this.runtime);
                }

                if (this.currentTo.y) {
                    const deltaY =  this.currentTo.y - this.currentFrom.y;
                    this.pixiObject.scale.y = this.currentFrom.y + deltaY * this.easing((this.progress - this.startDelay) / this.runtime);
                }
            }

            if (this.progress >= this.runtimeTotal) {
                this.onFinished();
            }
        }
    }
}

export default PixiTweenScale;