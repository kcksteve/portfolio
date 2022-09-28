//Behavior to rotate the object
class PixiRotation {
    //Ref to pixi app
    pixiApp;
    //Ref to object tween acts on
    pixiObject;
    //Name of the rotation
    name;
    //speed the object rotates at in degrees per second
    degreesPerSecond = 0;
    //True while animation is active
    isRunning;
    //Bound start function;
    boundStep;

    constructor(pixiApp, pixiObject, rotationConfig) {
        //required vars
        this.pixiApp = pixiApp;
        this.pixiObject = pixiObject;
        this.degreesPerSecond = rotationConfig.degreesPerSecond;
        this.name = rotationConfig.name;

        this.boundStep = () => this.step();

        if (rotationConfig.hasOwnProperty('playAtStart')) {
            if (rotationConfig.playAtStart) {
                this.start();
            }
        }
    }

    //Start the rotation behavior
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.pixiApp.ticker.add(this.boundStep);
        }
    }

    //Stop the rotation behavior
    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            this.pixiApp.ticker.remove(this.boundStep);
        }
    }

    //Step the rotation forward
    step() {
        if (this.degreesPerSecond > 0) {
            this.pixiObject.angle += (this.pixiApp.ticker.deltaMS * 0.001) * this.degreesPerSecond;

            if (this.pixiObject.angle > 360) {
                this.pixiObject.angle = this.pixiObject.angle - 360;
            }
        } else {
            this.pixiObject.angle += (this.pixiApp.ticker.deltaMS * 0.001) * this.degreesPerSecond;

            if (this.pixiObject.angle < 0) {
                this.pixiObject.angle = 360 - this.pixiObject.angle;
            }
        }
    }
}

export default PixiRotation;