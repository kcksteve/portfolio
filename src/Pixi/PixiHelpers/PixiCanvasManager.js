//Manages the canvas pixi is drawing onto
//Uses the sizing object to determine how to scale
//The resolution the objects were created in combined with the
//prefernce to scale to height or width allows black bar free scaling
class PixiCanvasManager {
    //Ref to pixi app
    pixiApp;
    //Element that this canvas will be appended to
    parentElement;
    //Object containing the parameters used for scaling
    sizing;

    constructor(pixiApp, parentElement, name, sizing) {
        this.pixiApp = pixiApp;
        this.parentElement = parentElement;
        this.sizing = sizing

        parentElement.appendChild(pixiApp.view);
        pixiApp.view.id = name;

        window.addEventListener('resize', () => this.resize());
        this.style();
        this.resize();
    }

    //Called everytime there is a size cange to adjust scaling
    resize() {
        let scaleRatio = 1;
        const canvasWidth = this.sizing.canvasWidth ? this.sizing.canvasWidth : this.parentElement.offsetWidth;
        const canvasHeight = this.sizing.canvasHeight ? this.sizing.canvasHeight : this.parentElement.offsetHeight;
        this.pixiApp.renderer.resize(canvasWidth, canvasHeight);

        if (this.sizing.scaleTo === 'height') {
            scaleRatio = canvasHeight / this.sizing.baseHeight;
        }
        else if (this.sizing.scaleTo === 'width') {
            scaleRatio =  canvasWidth / this.sizing.baseWidth;
        }

        this.pixiApp.stage.scale.x = scaleRatio;
        this.pixiApp.stage.scale.y = scaleRatio;

        //Sets the origin to the center of the screen
        this.pixiApp.stage.position.x = this.pixiApp.renderer.width / 2;
        this.pixiApp.stage.position.y = this.pixiApp.renderer.height / 2;
    }

    //Override styles in case of browser defaults
    style() {
        this.parentElement.style.border = 0;
        this.parentElement.style.padding = 0;
        this.parentElement.style.margin = 0;
        this.pixiApp.view.style.border = 0;
        this.pixiApp.view.style.padding = 0;
        this.pixiApp.view.style.margin = 0;
        this.pixiApp.view.style.display = 'block';
    }
}

export default PixiCanvasManager;