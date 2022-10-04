import PixiObjectConstructor from "../PixiHelpers/PixiObjectConstructor";
import PixiScene from "../PixiHelpers/PixiScene";
import * as PIXI from 'pixi.js';

class StarfieldScene extends PixiScene {
    name = 'starfield';
    isDefault = true;

    constructor(sceneManager, pixiObjects) {
        super(sceneManager, pixiObjects);
    }

    load(parent) {
        super.load(parent);
        const fieldDistFromCenter = 2500;

        let posOrNegX = 1;
        let posOrNegY = 1;
        for (let i = 0; i < 250; i++) {
            if (Math.random() >= 0.5) {
                posOrNegX = 1
            }
            else {
                posOrNegX = -1
            }

            if (Math.random() >= 0.5) {
                posOrNegY = 1
            }
            else {
                posOrNegY = -1
            }

            this.pixiObjectConstructor.constructById(
                0,
                this.container,
                {
                    positionX: Math.random() * fieldDistFromCenter * posOrNegX,
                    positionY: Math.random() * fieldDistFromCenter * posOrNegY,
                    opacity: 1 - Math.random() * 0.8
                }
            );
        }

        this.pixiObjectConstructor.constructById(
            1,
            this.container
        );
    }

    unload() {
        super.unload();
    }
}

export default StarfieldScene;