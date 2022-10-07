//Class to control multiple tweens when they should be played together
//Gotcha - Looping tweens are not considered when checking if all tweens
//are finished to call onFinishedCallback
class PixiTweenGroup {
    //Name of tween group
    name;
    //Array of tweens in group
    #tweens = [];
    //Will restart all tweens after all tweens have finished
    isLooping = false;
    //Function to call when all tweens finish playing
    onFinishedCallback = null;
    //Count of members that are not looping
    #nonLoopingMemberCount = 0;
    //Count of members that have finished playing and are not looping
    #nonLoopingMembersFinished = 0;

    constructor(tweenGroupConfig) {
        this.name = tweenGroupConfig.name;
        if (tweenGroupConfig.hasOwnProperty('onFinishedCallback')) {
            this.onFinishedCallback = tweenGroupConfig.onFinishedCallback;
        }
        if (tweenGroupConfig.hasOwnProperty('isLooping')) {
            this.isLooping = tweenGroupConfig.isLooping;
        }
    }

    //Starts all the tweens in the group
    startAllTweens() {
        this.#tweens.forEach((tween) => {
            tween.startTween();
        })
    }

    //Stops all tweens in the group
    stopAllTweens() {
        this.#tweens.forEach((tween) => {
            tween.stopTween();
        })
    }

    //Resume playing all tweens
    resumeAllTweens() {
        this.#tweens.forEach((tween) => {
            tween.resumeTween();
        })
    }

    //Add a tween to the group
    addTweenToGroup(tween) {
        tween.tweenGroup = this;
        this.#tweens.push(tween);
    }

    //Called by the tweens in the group everytime one finishes
    memberFinished() {
        this.#nonLoopingMemberCount = 0;
        this.#nonLoopingMembersFinished = 0;
        this.#tweens.forEach((tween) => {
            if (!tween.isLooping) {
                this.#nonLoopingMemberCount += 1;
                if (!tween.isPlaying) {
                    this.#nonLoopingMembersFinished += 1;
                }
            }
        })

        if (this.#nonLoopingMemberCount === this.#nonLoopingMembersFinished) {
            if (this.onFinishedCallback) {
                this.onFinishedCallback();
            }

            if (this.isLooping) {
                this.startAllTweens();
            }
        }
    }
}

export default PixiTweenGroup;