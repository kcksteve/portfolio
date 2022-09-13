class PixiCanvasManager {
    pixiApp;
    parentElement;
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

    resize() {
        let scaleRatio = 1;
        const canvasWidth = this.sizing.canvasWidth ? this.sizing.canvasWidth : this.parentElement.offsetWidth;
        const canvasHeight = this.sizing.canvasHeight ? this.sizing.canvasHeight : this.parentElement.offsetHeight;
        this.pixiApp.renderer.resize(canvasWidth, canvasHeight);

        if (this.sizing.scaleTo === 'height') {
            scaleRatio = this.sizing.baseHeight / canvasHeight;
        }
        else if (this.sizing.scaleTo === 'width') {
            scaleRatio = this.sizing.baseWidth / canvasWidth;
        }

        this.pixiApp.stage.scale.x = this.sizing.baseHeight * scaleRatio;
        this.pixiApp.stage.scale.y = this.sizing.baseWidth * scaleRatio;

        //Sets the origin to the center of the screen
        this.pixiApp.stage.position.x = this.pixiApp.renderer.width / 2;
        this.pixiApp.stage.position.y = this.pixiApp.renderer.height / 2;
    }

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