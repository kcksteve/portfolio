import * as PIXI from 'pixi.js';
import PixiTweenGroup from './Behaviors/PixiTweenGroup';

//Creates pixi objects from an id that it finds in the definition objects.
//Appends them to the parent object
class PixiObjectConstructor {
    //Ref to pixi app
    pixiApp;
    //Array of objects containing the definitions of objects to construct
    pixiObjects;
    //Tween contructor object
    pixiTweenConstructor;
    //Resources (textures) preloaded by the PixiLoadinManager
    pixiResources;

    constructor(pixiApp, pixiObjects, pixiTweenConstructor) {
        this.pixiApp = pixiApp;
        this.pixiObjects = pixiObjects;
        this.pixiTweenConstructor = pixiTweenConstructor;
    }

    //Create an object by the matching id in pixiObjects
    //Adds it to the parent object
    //Uses the override object to replace any of the attibutes of the object
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

    //Used to conturcut static spite type objects
    #constructSprite(pixiObject, parent) {
        let object = new PIXI.Sprite(this.pixiResources[pixiObject.name].texture);
        this.#applyRequiredProperties(pixiObject, object);
        this.#applyVisualProperties(pixiObject, object);
        this.#applyTweens(pixiObject, object);
        this.#applyTweenGroups(pixiObject, object);
        parent.addChild(object);
        console.log(object);
        this.#constructChildren(pixiObject, object);
    }

    //Applies the required properties from the object definition to the object
    #applyRequiredProperties(pixiObject, object) {
        object.name = pixiObject.name;
        object.id = pixiObject.id;
    }

    //Adds tween objects from the object definition to the object
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

    //Adds tween group objects from the object definition to the object
    #applyTweenGroups(pixiObject, object) {
        if (pixiObject.hasOwnProperty('tweenGroups')) {
            object.tweenGroups = [];
            pixiObject.tweenGroups.forEach((tweenGroup) => {
                const newTweenGroup = new PixiTweenGroup(tweenGroup)
                object.tweenGroups.push(newTweenGroup);

                if (tweenGroup.hasOwnProperty('tweens')) {
                    tweenGroup.tweens.forEach((tween) => {
                        tween.tweenGroup = newTweenGroup;
                        newTweenGroup.addTweenToGroup(
                            this.pixiTweenConstructor.createTween(
                                this.pixiApp,
                                object,
                                tween
                            )
                        );
                    });
                }
            });
        }
    }

    //Applies the visual properties from the object definition to the object
    //Includes defaults if property not specified
    #applyVisualProperties(pixiObject, object) {
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

    //Calls the contruct object by id for each child object specified
    //Children can contain parameters to override the parents
    #constructChildren(pixiObject, parent) {
        if (pixiObject.hasOwnProperty('children') && pixiObject.children) {
            pixiObject.children.forEach(child => {
                this.constructById(child.id, parent, child);
            });
        }
    }
}

export default PixiObjectConstructor;