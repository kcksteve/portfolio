//Behavior to move the object in a direction specified by an angle
class PixiMovement {
     //Ref to pixi app
    pixiApp;
    //Ref to object tween acts on
    pixiObject;
    //Name of the rotation
    name;
    //speed the object move in degrees per second
    pixelsPerSecond = 0;
    //The angle the obejct will travel in
    angleOfMovement = 0;
    //The amount of pixels to step along the x axis
    #stepX;
    //The amount of pixels to step along the y axis
    #stepY;
    //True while animation is active
    isRunning;
    //Bound start function;
    boundStep;

    constructor(pixiApp, pixiObject, movementConfig) {
        //required vars
        this.pixiApp = pixiApp;
        this.pixiObject = pixiObject;
        this.pixelsPerSecond = movementConfig.pixelsPerSecond;
        this.angleOfMovement = movementConfig.angleOfMovement;
        this.name = movementConfig.name;

        this.boundStep = () => this.step();

        this.updateDirection();

        if (movementConfig.hasOwnProperty('playAtStart')) {
            if (movementConfig.playAtStart) {
                this.start();
            }
        }
    }

    updateDirection() {
        const radians = this.angleOfMovement  * (Math.PI / 180);
        this.#stepX = this.pixelsPerSecond * Math.cos(radians);
        this.#stepY = this.pixelsPerSecond * Math.sin(radians);
    }

    //Start the rotation behavior
    start() {
        this.isRunning = true;
        this.pixiApp.ticker.add(this.boundStep);
    }

    //Stop the rotation behavior
    stop() {
        this.isRunning = false;
        this.pixiApp.ticker.remove(this.boundStep);
    }

    //Step the rotation forward
    step() {
        this.pixiObject.position.x += (this.pixiApp.ticker.deltaMS * 0.001) * this.#stepX;
        this.pixiObject.position.y += (this.pixiApp.ticker.deltaMS * 0.001) * this.#stepY;
    }
}

export default PixiMovement;