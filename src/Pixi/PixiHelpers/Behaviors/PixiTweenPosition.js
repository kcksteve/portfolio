import PixiTween from "./PixiTween";

//Tween for position over one or two axis
class PixiTweenPosition extends PixiTween {
    constructor(pixiApp, pixiObject, pixiEasings, tweenConfig) {
        super(pixiApp, pixiObject, pixiEasings, tweenConfig);
    }

    //Called before the start of the animation to refresh the start/end values for animations
    updateTweenTarget() {
        if (this.targetFrom.x === null && this.targetTo.x !== null) {
            this.currentFrom.x = this.pixiObject.position.x;
            this.currentTo.x = this.pixiObject.position.x + this.targetTo.x;
        }
        else if (this.targetFrom.x !== null && this.targetTo.x !== null) {
            this.currentFrom.x = this.targetFrom.x;
            this.currentTo.x = this.targetTo.x;
        }

        if (this.targetFrom.y === null && this.targetTo.y !== null) {
            this.currentFrom.y = this.pixiObject.position.y;
            this.currentTo.y = this.pixiObject.position.y + this.targetTo.y;
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
                    this.pixiObject.position.x = this.currentFrom.x + deltaX * this.easing(animationProgress);
                }

                if (this.currentTo.y !== null) {
                    const deltaY =  this.currentTo.y - this.currentFrom.y;
                    this.pixiObject.position.y = this.currentFrom.y + deltaY * this.easing(animationProgress);
                }
            }

            if (this.progress >= this.runtimeTotal) {
                this.onFinished();
            }
        }
    }
}

export default PixiTweenPosition;