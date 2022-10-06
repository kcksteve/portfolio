import PixiObjectConstructor from "../PixiHelpers/PixiObjectConstructor";
import PixiScene from "../PixiHelpers/PixiScene";
import * as PIXI from 'pixi.js';
import PIXITWEENS from '../PixiHelpers/Behaviors/PixiTweens';

class StarfieldScene extends PixiScene {
    name = 'starfield';
    isDefault = true;

    constructor(sceneManager, pixiObjects) {
        super(sceneManager, pixiObjects);
    }

    load(parent) {
        super.load(parent);

        const starContainer = this.pixiObjectConstructor.constructById(
            2,
            this.container
        );

        const backgroundStars = () => {
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
                    starContainer,
                    {
                        positionX: Math.random() * fieldDistFromCenter * posOrNegX,
                        positionY: Math.random() * fieldDistFromCenter * posOrNegY,
                        opacity: 1 - Math.random() * 0.8,
                        tweens: [
                            {
                                name: 'fadeIn',
                                tweenType: PIXITWEENS.opacity,
                                runtime: 3000,
                                startDelay: Math.random() * 3000 + 2000,
                                easing: 'linear',
                                playAtStart: true,
                                isLooping: true,
                                targetFrom: {
                                    x: 0.5,
                                },
                                targetTo: {
                                    x: 1,
                                }
                            }
                        ]
                    }
                );
            }
        }

        const streakStars = () => {
            const fieldDistFromCenter = 200;
            let posOrNegX = 1;
            let posOrNegY = 1;
            let angle = 0;

            for (let i = 0; i < 50; i++) {
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

                angle = Math.random() * 360;

                this.pixiObjectConstructor.constructById(
                    1,
                    starContainer,
                    {
                        positionX: Math.random() * fieldDistFromCenter * posOrNegX,
                        positionY: Math.random() * fieldDistFromCenter * posOrNegY,
                        angle: angle,
                        opacity: 1 - Math.random() * 0.8,
                        tweens: [
                            {
                                name: 'fadeIn',
                                tweenType: PIXITWEENS.opacity,
                                runtime: 3000,
                                startDelay: Math.random() * 3000 + 2000,
                                easing: 'linear',
                                playAtStart: true,
                                isLooping: true,
                                targetFrom: {
                                    x: 0.5,
                                },
                                targetTo: {
                                    x: 1,
                                }
                            }
                        ]
                    }
                );
            }
        }

        backgroundStars();
        streakStars();
    }

    unload() {
        super.unload();
    }
}

export default StarfieldScene;