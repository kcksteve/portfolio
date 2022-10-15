import PixiScene from "../PixiHelpers/PixiScene";
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
            4,
            this.container
        );

        const starContainerFade = this.pixiObjectConstructor.constructById(
            6,
            starContainer,
            {
                tweenGroups: [
                    {
                        name: 'fadeAndGrowOut',
                        tweens: [
                            {
                                name: 'fadeOut',
                                tweenType: PIXITWEENS.opacity,
                                runtime: 2000,
                                easing: 'linear',
                                targetFrom: {
                                    x: 1,
                                },
                                targetTo: {
                                    x: 0,
                                }
                            },
                            {
                                name: 'growOut',
                                tweenType: PIXITWEENS.scale,
                                runtime: 2100,
                                easing: 'inCubic',
                                targetFrom: {
                                    x: 1,
                                    y: 1
                                },
                                targetTo: {
                                    x: 2,
                                    y: 2
                                }
                            }
                        ]
                    }
                ]
            }
        );

        const starContainerPermenant = this.pixiObjectConstructor.constructById(
            6,
            starContainer,
            {
                opacity: 0,
                scaleX: 0.5,
                scaleY: 0.5,
                tweenGroups: [
                    {
                        name: 'fadeInAndGrow',
                        tweens: [
                            {
                                name: 'fadeIn',
                                tweenType: PIXITWEENS.opacity,
                                runtime: 3000,
                                easing: 'outQuint',
                                targetFrom: {
                                    x: 0,
                                },
                                targetTo: {
                                    x: 1,
                                }
                            },
                            {
                                name: 'growIn',
                                tweenType: PIXITWEENS.scale,
                                runtime: 3000,
                                easing: 'outQuint',
                                targetFrom: {
                                    x: 0.5,
                                    y: 0.5
                                },
                                targetTo: {
                                    x: 1,
                                    y: 1
                                }
                            }
                        ]
                    }
                ],
            }
        );

        const starContainerMoving = this.pixiObjectConstructor.constructById(
            6,
            starContainer,
        );

        const starContainerStreak = this.pixiObjectConstructor.constructById(
            6,
            starContainer,
        );

        const starContainerStreakBurst = this.pixiObjectConstructor.constructById(
            6,
            starContainer,
        );

        const staticStars = (starId, starCount, container) => {
            const fieldDistFromCenter = 2000;
            let posOrNegX = 1;
            let posOrNegY = 1;
            let scaleAdder = 0.5;
            let scaleRandom = 1;
            let startDelay = 0;

            for (let i = 0; i < starCount; i++) {
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

                startDelay = Math.random() * 3000 + 2000;

                scaleRandom = Math.random();

                this.pixiObjectConstructor.constructById(
                    starId,
                    container,
                    {
                        positionX: Math.random() * fieldDistFromCenter * posOrNegX,
                        positionY: Math.random() * fieldDistFromCenter * posOrNegY,
                        scaleX: (1 - scaleAdder) + scaleRandom * (scaleAdder * 1.5),
                        scaleY: (1 - scaleAdder) + scaleRandom * (scaleAdder * 1.5),
                        //opacity: 1 - Math.random() * 0.5 + 0.2,
                        opacity: 0,
                        tweens: [
                            {
                                name: 'twinkle',
                                tweenType: PIXITWEENS.opacity,
                                runtime: 3000,
                                startDelay: startDelay,
                                easing: 'linear',
                                playAtStart: true,
                                isLooping: true,
                                isPingPong: true,
                                targetFrom: {
                                    x: 0.5,
                                },
                                targetTo: {
                                    x: 1,
                                }
                            },
                            {
                                name: 'fadeIn',
                                tweenType: PIXITWEENS.opacity,
                                runtime: 1000,
                                startDelay: startDelay - 1000,
                                easing: 'linear',
                                playAtStart: true,
                                targetFrom: {
                                    x: 0,
                                },
                                targetTo: {
                                    x: 0.5,
                                }
                            }
                        ]
                    }
                );
            }
        }

        const streakStars = () => {
            const fieldDistFromCenter = 350;
            const fieldDistForTween = 2000;
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
                startDelay = 200 + Math.random() * 2800;
                runtime = 500 + Math.random() * 400;

                this.pixiObjectConstructor.constructById(
                    2,
                    starContainerStreak,
                    {
                        positionX: posX,
                        positionY: posY,
                        angle: angle,
                        opacity: 0,
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
            }
        }

        const streakStarBurst = () => {
            const fieldDistFromCenter = 250;
            let fieldDistOffset = 0;
            const fieldDistForTween = 2000;
            let posX = 0;
            let posY = 0;
            let destX = 0;
            let destY = 0;
            let angle = 0;
            let radians = 0;
            let startDelay = 0;
            let startDelayBase = 250;
            let runtime = 0;

            for (let i = 0; i < 250; i++) {
                fieldDistOffset = Math.random() * 100 + fieldDistFromCenter;
                angle = Math.random() * 360;
                radians = angle * (Math.PI / 180);
                posX = fieldDistOffset * Math.cos(radians);
                posY = fieldDistOffset * Math.sin(radians);
                destX = fieldDistForTween * Math.cos(radians);
                destY = fieldDistForTween * Math.sin(radians);
                startDelay = startDelayBase + Math.random() * 250;
                startDelayBase += 5;
                runtime = Math.random() * 500;

                this.pixiObjectConstructor.constructById(
                    5,
                    starContainerStreakBurst,
                    {
                        positionX: posX,
                        positionY: posY,
                        angle: angle,
                        opacity: 0,
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
            }
        }

        const movingStars = () => {
            const fieldDistFromCenter = 200;
            const fieldDistForTween = 2000;
            let posX = 0;
            let posY = 0;
            let destX = 0;
            let destY = 0;
            let angle = 0;
            let radians = 0;
            let startDelay = 0;
            let runtime = 0;
            let scale = 0;

            for (let i = 0; i < 30; i++) {
                angle = Math.random() * 360;
                radians = angle * (Math.PI / 180);
                posX = fieldDistFromCenter * Math.cos(radians);
                posY = fieldDistFromCenter * Math.sin(radians);
                destX = fieldDistForTween * Math.cos(radians);
                destY = fieldDistForTween * Math.sin(radians);
                startDelay = Math.random() * 2500;
                runtime = 1500 + Math.random() * 1500;
                scale = 0.5 + Math.random();

                this.pixiObjectConstructor.constructById(
                    3,
                    starContainerMoving,
                    {
                        positionX: posX,
                        positionY: posY,
                        angle: angle,
                        opacity: 0,
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
                                        name: 'grow',
                                        tweenType: PIXITWEENS.scale,
                                        runtime: runtime,
                                        startDelay: startDelay,
                                        easing: 'linear',
                                        playAtStart: true,
                                        targetFrom: {
                                            x: scale,
                                            y: scale
                                        },
                                        targetTo: {
                                            x: scale * 1.5,
                                            y: scale * 1.5
                                        }
                                    },
                                    {
                                        name: 'fadeInOut',
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
            }
        }

        const stopChildrenTweenGroupsLooping = (obj) => {
            obj.children.forEach(child => {
                child.tweenGroups.forEach(tweenGroup => {
                    tweenGroup.isLooping = false;
                });
            });
        }

        staticStars(0, 550, starContainerFade);
        staticStars(1, 100, starContainerFade);
        staticStars(0, 100, starContainerPermenant);

        setTimeout(() => {
            startAnimChain();
        }, 10000);

        const startAnimChain = () => {
            starContainerFade.tweenGroups[0].startAllTweens()

            streakStarBurst();
            streakStars();
            movingStars();

            setTimeout(() => {
                stopChildrenTweenGroupsLooping(starContainerStreakBurst);
            }, 1000)

            setTimeout(() => {
                stopChildrenTweenGroupsLooping(starContainerStreak);
                stopChildrenTweenGroupsLooping(starContainerMoving);
            }, 6000)

            setTimeout(() => {
                starContainerPermenant.tweenGroups[0].startAllTweens()
            }, 8000)
        }
    }

    unload() {
        super.unload();
    }
}

export default StarfieldScene;