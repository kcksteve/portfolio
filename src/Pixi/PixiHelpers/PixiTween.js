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
    progress;
    runtime;
    easing;
    tweenGroup;
    onFinishedCallback;

    constructor(pixiApp, pixiObject, pixiEasings, tweenConfig) {
        this.pixiApp = pixiApp;
        this.pixiObject = pixiObject;
        this.name = tweenConfig.name;
        this.isLooping = tweenConfig.isLooping;
        this.progress = tweenConfig.startingProgress;
        this.runtime = tweenConfig.runtime;
        this.easing = pixiEasings.getMethodByName(tweenConfig.easing);
        this.tweenGroup = tweenConfig.tweenGroup;
        this.onFinishedCallback = this.onFinishedCallback;

        if (tweenConfig.targetTo.hasOwnProperty('x')) {
            this.targetTo.x = tweenConfig.targetTo.x;
        }
        if (tweenConfig.targetTo.hasOwnProperty('y')) {
            this.targetTo.y = tweenConfig.targetTo.y;
        }
        if (tweenConfig.hasOwnProperty('targetFrom')) {
            this.targetFrom.x = tweenConfig.targetFrom.x;
            this.targetFrom.y = tweenConfig.targetFrom.y;
        }

        if (tweenConfig.playAtStart) this.startTween();
    }

    updateTweenTarget() {
        //different for each derived class
    }

    startTween() {
        this.progress = 0;
        this.isPlaying = true;
        this.updateTweenTarget();
        this.pixiApp.ticker.add(this.stepTween);
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

    #onFinished() {
        if (this.tweenGroup) {
            this.tweenGroup.memberFinished();
        }

        if (this.onFinishedCallback) {
            this.onFinishedCallback();
        }

        if (this.isLooping) {
            this.startTween();
        }
    }
}

export default PixiTween;