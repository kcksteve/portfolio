class PixiTween {
    pixiApp;
    pixiObject;
    name;
    isPlaying = false;
    isLooping = false;
    targetFrom = {};
    targetTo = {};
    currentFrom = {};
    currentTo = {};
    startDelay = 0;
    progress;
    runtime;
    runtimeTotal;
    easing;
    tweenGroup;
    onFinishedCallback;

    constructor(pixiApp, pixiObject, pixiEasings, tweenConfig) {
        //Required vars
        this.pixiApp = pixiApp;
        this.pixiObject = pixiObject;
        this.name = tweenConfig.name;
        this.runtime = tweenConfig.runtime;
        this.runtimeTotal = this.runtime;
        this.easing = pixiEasings.getMethodByName(tweenConfig.easing);

        //Target vars partially required
        if (tweenConfig.targetTo.hasOwnProperty('x')) {
            this.targetTo.x = tweenConfig.targetTo.x;
        }
        else {
            this.targetTo.x = null;
        }

        if (tweenConfig.targetTo.hasOwnProperty('y')) {
            this.targetTo.y = tweenConfig.targetTo.y;
        }
        else {
            this.targetTo.y = null;
        }

        if (tweenConfig.hasOwnProperty('targetFrom')) {
            if (tweenConfig.targetFrom.hasOwnProperty('x')) {
                this.targetFrom.x = tweenConfig.targetFrom.x;
            }
            else {
                this.targetFrom.x = null;
            }

            if (tweenConfig.targetFrom.hasOwnProperty('y')) {
                this.targetFrom.y = tweenConfig.targetFrom.y;
            }
            else {
                this.targetFrom.y = null;
            }
        }

        //Optional vars
        this.isLooping = tweenConfig.isLooping;
        this.startDelay = tweenConfig.startDelay;
        this.runtimeTotal += this.startDelay;
        this.progress = tweenConfig.startingProgress;
        this.tweenGroup = tweenConfig.tweenGroup;
        this.onFinishedCallback = this.onFinishedCallback;

        if (tweenConfig.playAtStart) this.startTween();
    }

    updateTweenTarget() {
        //different for each derived class
    }

    startTween() {
        this.progress = 0;
        this.updateTweenTarget();
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.pixiApp.ticker.add(this.stepTween);
        }
    }

    resumeTween() {
        this.isPlaying = true;
        this.pixiApp.ticker.add(this.stepTween);
    }

    stopTween() {
        this.isPlaying = false;
        this.pixiApp.ticker.remove(this.stepTween);
    }

    stepTween() {
        //different for each derived class
    }

    onFinished() {
        if (this.tweenGroup && !this.isLooping) {
            this.tweenGroup.memberFinished();
        }

        if (this.onFinishedCallback) {
            this.onFinishedCallback();
        }

        if (this.isLooping) {
            this.startTween();
        }
        else {
            this.stopTween();
        }
    }
}

export default PixiTween;