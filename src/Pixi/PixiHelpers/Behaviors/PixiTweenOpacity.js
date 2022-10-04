import PixiTween from "./PixiTween";

//Tween for opacity / alpha
class PixiTweenOpacity extends PixiTween {
    constructor(pixiApp, pixiObject, pixiEasings, tweenConfig) {
        super(pixiApp, pixiObject, pixiEasings, tweenConfig);
    }

    //Called before the start of the animation to refresh the start/end values for animations
    updateTweenTarget() {
        if (this.targetFrom.x === null && this.targetTo.x !== null) {
            this.currentFrom.x = this.pixiObject.alpha;
            this.currentTo.x = this.pixiObject.alpha + this.targetTo.x;
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

            let animationProgress = 0;
            if (!this.isPingPong) {
                animationProgress = (this.progress - this.startDelay) / this.runtime;
            }
            else {
                const reversePoint = this.startDelay + (this.runtime / 2);
                if (this.progress <= reversePoint) {
                    animationProgress = (this.progress - this.startDelay) / (reversePoint - this.startDelay);
                }
                else {
                    animationProgress = 1 - ((this.progress - this.startDelay) / (reversePoint - this.startDelay) - 1);
                }
            }

            if (this.progress >= this.startDelay) {
                if (this.currentTo.x !== null) {
                    const deltaX = this.currentTo.x - this.currentFrom.x;
                    this.pixiObject.alpha = this.currentFrom.x + deltaX * this.easing(animationProgress);
                }
            }

            if (this.progress >= this.runtimeTotal) {
                this.onFinished();
            }
        }
    }
}

export default PixiTweenOpacity;