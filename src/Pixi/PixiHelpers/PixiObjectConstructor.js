import * as PIXI from 'pixi.js';

class PixiObjectConstructor {
    pixiApp;
    pixiObjects;
    pixiTweenConstructor;
    pixiResources;

    constructor(pixiApp, pixiObjects, pixiTweenConstructor) {
        this.pixiApp = pixiApp;
        this.pixiObjects = pixiObjects;
        this.pixiTweenConstructor = pixiTweenConstructor;
    }

    constructById(id, parent, overrides) {
        let pixiObject;
        if (!overrides) {
            pixiObject =  this.pixiObjects[id];
        }
        else {
            pixiObject = {...this.pixiObjects[id], ...overrides};
        }
        switch(pixiObject.type) {
            case 'sprite':
                this.#constructSprite(pixiObject, parent, overrides);
                break;
        }
    }

    #constructSprite(pixiObject, parent) {
        let object = new PIXI.Sprite(this.pixiResources[pixiObject.name].texture);
        this.#applyRequiredProperties(pixiObject, object);
        this.#applyParameters(pixiObject, object);
        this.#applyTweens(pixiObject, object);
        parent.addChild(object);
        console.log(object);
        this.#constructChildren(pixiObject, object);
    }

    #applyRequiredProperties(pixiObject, object) {
        object.name = pixiObject.name;
        object.id = pixiObject.id;
    }

    #applyTweens(pixiObject, object) {
        if (pixiObject.hasOwnProperty('tweens')) {
            object.tweens = [];
            pixiObject.tweens.forEach((tween) => {
                object.tweens.push(
                    this.pixiTweenConstructor.createTween(
                        this.pixiApp,
                        object,
                        tween
                    ));
            });
        }
    }

    #applyParameters(pixiObject, object) {
        let anchorX = 0.5;
        let anchorY = 0.5;
        let scaleX = 1;
        let scaleY = 1;
        let positionX = 0;
        let positionY = 0;
        let positionZ = 0;
        let angle = 0;
        let opacity = 1;


        if (pixiObject.hasOwnProperty('anchorX')) {
            anchorX = pixiObject.anchorX;
        }

        if (pixiObject.hasOwnProperty('anchorY')) {
            anchorY = pixiObject.anchorY;
        }

        if (pixiObject.hasOwnProperty('scaleX')) {
            scaleX = pixiObject.scaleX;
        }

        if (pixiObject.hasOwnProperty('scaleY')) {
            scaleY = pixiObject.scaleY;
        }

        if (pixiObject.hasOwnProperty('positionX')) {
            positionX = pixiObject.positionX;
        }

        if (pixiObject.hasOwnProperty('positionY')) {
            positionY = pixiObject.positionY;
        }

        if (pixiObject.hasOwnProperty('positionZ')) {
            positionZ = pixiObject.positionZ;
        }

        if (pixiObject.hasOwnProperty('angle')) {
            angle = pixiObject.angle;
        }

        if (pixiObject.hasOwnProperty('opacity')) {
            opacity = pixiObject.opacity;
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
        object.alpha = opacity;
    }

    #constructChildren(pixiObject, parent) {
        if (pixiObject.hasOwnProperty('children') && pixiObject.children) {
            pixiObject.children.forEach(child => {
                this.constructById(child.id, parent, child);
            });
        }
    }
}

export default PixiObjectConstructor;