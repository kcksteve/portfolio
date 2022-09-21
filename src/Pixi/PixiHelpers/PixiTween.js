//Base class for different tweens
class PixiTween {
    //Ref to pixi app
    pixiApp;
    //Ref to object tween acts on
    pixiObject;
    //Name of tween
    name;
    //True while delay or animation is active
    isPlaying = false;
    //True if animation will loop
    isLooping = false;
    //X and/or Y value indicating the start point of the animation.
    //If left empty it indicates a relative animation where
    //the animation starts from the current value.
    targetFrom = {};
    //X and/or Y value indicating the end point of the animation.
    targetTo = {};
    //Stores the end of the animation
    currentFrom = {};
    //Stores the start of the animation
    currentTo = {};
    //Delay before starting the animation phase
    startDelay = 0;
    //Progress through the animation including delay and animation phase
    progress;
    //Total length of animation stage
    runtime;
    //Total length including animation and start delay
    runtimeTotal;
    //Ref to the easing algorithm used
    easing;
    //The tweengroup this tween belongs to
    tweenGroup;
    //Function to call when the animation finishes
    onFinishedCallback;
    //Bound step tween function
    boundStepTween;

    constructor(pixiApp, pixiObject, pixiEasings, tweenConfig) {
        console.log(tweenConfig);
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
        if (tweenConfig.hasOwnProperty('isLooping')) {
            this.isLooping = tweenConfig.isLooping;
        }
        if (tweenConfig.hasOwnProperty('startDelay')) {
            this.startDelay = tweenConfig.startDelay;
        }

        this.runtimeTotal += this.startDelay;

        if (tweenConfig.hasOwnProperty('startingProgress')) {
            this.progress = tweenConfig.startingProgress;
        }

        if (tweenConfig.hasOwnProperty('tweenGroup')) {
            this.tweenGroup = tweenConfig.tweenGroup;
        }

        if (tweenConfig.hasOwnProperty('onFinishedCallback')) {
            this.onFinishedCallback = this.onFinishedCallback;
        }

        this.boundStepTween = () => this.stepTween();

        if (tweenConfig.playAtStart) this.startTween();
    }

    //Called before the start of the animation to refresh the start/end values
    updateTweenTarget() {
        //different for each derived class
    }

    //Starts the tween
    startTween() {
        this.progress = 0;
        this.updateTweenTarget();
        if (!this.isPlaying) {
            this.isPlaying = true;
            //const test = () => this.stepTween()
            this.pixiApp.ticker.add(this.boundStepTween);
        }
    }

    //Resumes playing the tween if tween has started and not ended
    resumeTween() {
        if (this.progress > 0 && this.progress < this.runtimeTotal ) {
            this.isPlaying = true;
            this.pixiApp.ticker.add(this.boundStepTween);
        }
    }

    //Stop playing a tween at the current location
    stopTween() {
        this.isPlaying = false;
        this.pixiApp.ticker.remove(this.boundStepTween);
    }

    //Called each frame to step the tween forward
    stepTween() {
        //different for each derived class
    }

    //Called when the tween reaches the end of its playback
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