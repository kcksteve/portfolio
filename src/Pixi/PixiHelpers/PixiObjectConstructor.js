import * as PIXI from 'pixi.js';

class PixiObjectConstructor {
    pixiObjects;

    constructor(pixiObjects) {
        this.pixiObjects = pixiObjects;
    }

    test() {
        console.log('yo');
    }
}

export default PixiObjectConstructor;