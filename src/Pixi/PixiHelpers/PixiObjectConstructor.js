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

        this.#applyTranslation(pixiObject, object);
        object.name = pixiObject.name;
        object.id = pixiObject.id;
        parent.addChild(object);

        console.log(object);

        if (pixiObject.hasOwnProperty('children')) {
            this.#constructSprite(parent)
        }
    }

    #applyTranslation(pixiObject, object) {
        let anchorX = 0.5;
        let anchorY = 0.5;
        let scaleX = 1;
        let scaleY = 1;
        let positionX = 0;
        let positionY = 0;
        let positionZ = 0;
        let angle = 0;

        if (pixiObject.hasOwnProperty('translation')) {
            if (pixiObject.translation.hasOwnProperty('anchor')) {
                anchorX = pixiObject.translation.anchor.x;
                anchorY = pixiObject.translation.anchor.y;
            }

            if (pixiObject.translation.hasOwnProperty('scale')) {
                scaleX = pixiObject.translation.scale.x;
                scaleY = pixiObject.translation.scale.y;
            }

            if (pixiObject.translation.hasOwnProperty('position')) {
                positionX = pixiObject.translation.position.x;
                positionY = pixiObject.translation.position.y;
            }

            if (pixiObject.translation.hasOwnProperty('angle')) {
                angle = pixiObject.translation.angle;
            }
        }

        object.sortableChildren = true;
        object.anchor.x = anchorX;
        object.anchor.y = anchorY;
        object.scale.x = scaleX;
        object.scale.y = scaleY;
        object.position.x = positionX;
        object.position.y = positionY;
        object.zIndex = positionZ;
        object.angle = angle;
    }
}

export default PixiObjectConstructor;