import PixiTween from "./PixiTween";

class PixiTweenOpacity extends PixiTween {
    constructor() {
        super();
    }

    updateTweenTarget() {
        if (!this.targetFrom.x || !this.targetFrom.y) {
            if (!this.targetFrom.x) {
                this.currentFrom.x = this.pixiObject.position.x;
                this.currentTo.x = this.pixiObject.position.x + this.targetTo.x;
            }
            if (!this.targetFrom.y) {
                this.currentFrom.y = this.pixiObject.position.y
                this.currentTo.y = this.pixiObject.position.y + this.targetTo.y;
            }
        }
    }

    stepTween() {
        if (this.isPlaying) {
            if (this.progress + this.pixiApp.ticker.deltaTime < this.runtimeTotal) {
                this.progress += this.pixiApp.ticker.deltaTime;
            }
            else {
                this.progress = this.runtimeTotal;
            }

            if (this.progress >= this.startDelay) {
                if (this.currentTo.x) {
                    const deltaX = this.currentFrom.x - this.currentTo.x;
                    this.pixiObject.position.x = this.currentFrom.x + deltaX * this.easing((this.progress - this.startDelay) / this.runtime);
                }

                if (this.currentTo.y) {
                    const deltaY = this.currentFrom.y - this.currentTo.y;
                    this.pixiObject.position.y = this.currentFrom.y + deltaY * this.easing((this.progress - this.startDelay) / this.runtime);
                }
            }

            if (this.progress >= this.runtimeTotal) {
                this.onFinished();
            }
        }
    }
}

export default PixiTweenOpacity;