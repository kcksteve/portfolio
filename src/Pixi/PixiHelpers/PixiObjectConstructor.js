import * as PIXI from 'pixi.js';

class PixiObjectConstructor {
    pixiObjects;
    pixiResources;

    constructor(pixiObjects) {
        this.pixiObjects = pixiObjects;
    }

    constructById(id, parent) {
        const pixiObject =  this.pixiObjects[id];
        switch(pixiObject.type) {
            case 'sprite':
                this.#constructSprite(pixiObject, parent);
                break;
        }
    }

    #constructSprite(pixiObject, parent) {
        let object = new PIXI.Sprite(this.pixiResources[pixiObject.name].texture);
        object.anchor.x = 0.5;
        object.anchor.y = 0.5;
        object.scale.x = 1;
        object.scale.y = 1;
        object.x = 0;
        object.y = 0;
        parent.addChild(object);
    }
}

export default PixiObjectConstructor;