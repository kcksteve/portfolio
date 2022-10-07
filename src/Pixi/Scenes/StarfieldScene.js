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
            const fieldDistFromCenter = 350;
            const fieldDistForTween = 3000;
            let posX = 0;
            let posY = 0;
            let destX = 0;
            let destY = 0;
            let angle = 0;
            let radians = 0;
            let startDelay = 0;
            let runtime = 0;

            for (let i = 0; i < 30; i++) {
                angle = Math.random() * 360;
                radians = angle * (Math.PI / 180);
                posX = fieldDistFromCenter * Math.cos(radians);
                posY = fieldDistFromCenter * Math.sin(radians);
                destX = fieldDistForTween * Math.cos(radians);
                destY = fieldDistForTween * Math.sin(radians);
                startDelay = Math.random() * 3000 + 2000;
                runtime = Math.random() * 500;

                let star = this.pixiObjectConstructor.constructById(
                    1,
                    starContainer,
                    {
                        positionX: posX,
                        positionY: posY,
                        angle: angle,
                        opacity: 1 - Math.random() * 0.8,
                        tweenGroups: [
                            {
                                name: 'moveandfade',
                                isLooping: true,
                                tweens: [
                                    {
                                        name: 'movement',
                                        tweenType: PIXITWEENS.position,
                                        runtime: runtime,
                                        startDelay: startDelay,
                                        easing: 'linear',
                                        playAtStart: true,
                                        targetFrom: {
                                            x: posX,
                                            y: posY
                                        },
                                        targetTo: {
                                            x: destX,
                                            y: destY
                                        }
                                    },
                                    {
                                        name: 'fadeIn',
                                        tweenType: PIXITWEENS.opacity,
                                        runtime: runtime * 0.1,
                                        startDelay: startDelay,
                                        easing: 'linear',
                                        playAtStart: true,
                                        targetFrom: {
                                            x: 0,
                                        },
                                        targetTo: {
                                            x: 1,
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                );
                console.log(star);
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