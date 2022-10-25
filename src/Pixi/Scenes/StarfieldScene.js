import PixiScene from "../PixiHelpers/PixiScene";
import PIXITWEENS from '../PixiHelpers/Behaviors/PixiTweens';
import PixiAppManager from "../PixiHelpers/PixiAppManager";
import PixiSceneManager from "../PixiHelpers/PixiSceneManager";

class StarfieldScene extends PixiScene {
    name = 'starfield';
    isDefault = true;
    howls = this.sceneManager.pixiAppManager.howlManager.howls;

    constructor(sceneManager, pixiObjects) {
        super(sceneManager, pixiObjects);
    }

    load(parent) {
        super.load(parent);

        const blur = this.pixiObjectConstructor.constructById(
            7,
            this.container
        );

        const starContainer = this.pixiObjectConstructor.constructById(
            4,
            this.container
        );

        const makeStarContainerFade = (delay, runtime) => {
            return this.pixiObjectConstructor.constructById(
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
                                    runtime: runtime,
                                    startDelay: delay,
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
                                    runtime: runtime + 100,
                                    startDelay: delay,
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
        }

        const starContainerFade1 = makeStarContainerFade(0, 1900);
        const starContainerFade2 = makeStarContainerFade(0, 2150);
        const starContainerFade3 = makeStarContainerFade(0, 2600);

        const starContainerPermenant1 = this.pixiObjectConstructor.constructById(
            8,
            starContainer
        );

        const starContainerPermenant2 = this.pixiObjectConstructor.constructById(
            9,
            starContainer
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

        const staticStars = (starId, starCount, container, dist) => {
            const fieldDistFromCenter = dist ? dist : 2000;
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

                startDelay = Math.random() * 2000 + 500;

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
                                runtime: 500 + Math.random() * 500,
                                startDelay: startDelay * 8,
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
            const fieldDistFromCenter = 250;
            const fieldDistForTween = 2000;
            let posX = 0;
            let posY = 0;
            let destX = 0;
            let destY = 0;
            let angle = 0;
            let radians = 0;
            let startDelay = 0;
            let runtime = 0;

            for (let i = 0; i < 50; i++) {
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
                                        runtime: runtime * 0.2,
                                        startDelay: startDelay,
                                        easing: 'linear',
                                        playAtStart: true,
                                        targetFrom: {
                                            x: 0,
                                        },
                                        targetTo: {
                                            x: 1,
                                        }
                                    },
                                    {
                                        name: 'growIn',
                                        tweenType: PIXITWEENS.opacity,
                                        runtime: runtime * 0.2,
                                        startDelay: startDelay,
                                        easing: 'linear',
                                        playAtStart: true,
                                        targetFrom: {
                                            x: 0,
                                            y: 0
                                        },
                                        targetTo: {
                                            x: 1,
                                            y: 1
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
            const fieldDistFromCenter = 200;
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
                                        runtime: runtime * (0.05 + 0.1 * Math.random()),
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
            const fieldDistFromCenter = 150;
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
                runtime = 1500 + Math.random() * 500;
                scale = 0.1 + Math.random() * 0.5;

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
                                        runtime: runtime * 0.5,
                                        startDelay: startDelay,
                                        easing: 'linear',
                                        playAtStart: true,
                                        targetFrom: {
                                            x: scale,
                                            y: scale
                                        },
                                        targetTo: {
                                            x: scale * 1.75,
                                            y: scale * 1.75
                                        }
                                    },
                                    {
                                        name: 'fadeIn',
                                        tweenType: PIXITWEENS.opacity,
                                        runtime: runtime * (0.05 + (0.2 * Math.random())),
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

        staticStars(0, 350, starContainerFade1);
        staticStars(1, 50, starContainerFade1);
        staticStars(0, 350, starContainerFade2);
        staticStars(1, 50, starContainerFade2);
        staticStars(0, 350, starContainerFade3);
        staticStars(0, 100, starContainerPermenant1);
        staticStars(0, 3, starContainerPermenant2, 200);
        staticStars(0, 10, starContainerPermenant2, 1000);

        setTimeout(() => {
            startAnimChain();
        }, 10000);

        const startAnimChain = () => {
            this.howls[0].play();

            setTimeout(() => {
                starContainerFade1.tweenGroups[0].startAllTweens();
                starContainerFade2.tweenGroups[0].startAllTweens();
                starContainerFade3.tweenGroups[0].startAllTweens();
                starContainerPermenant2.tweenGroups[0].startAllTweens();
                starContainerPermenant2.tweenGroups[1].startAllTweens();
                blur.tweenGroups[0].startAllTweens();

                streakStarBurst();
                streakStars();
                movingStars();

                setTimeout(() => {
                    stopChildrenTweenGroupsLooping(starContainerStreakBurst);
                    blur.tweenGroups[1].startAllTweens();
                    //echoSfx.play();
                }, 1000)

                setTimeout(() => {
                    stopChildrenTweenGroupsLooping(starContainerMoving);
                }, 5000)

                setTimeout(() => {
                    stopChildrenTweenGroupsLooping(starContainerStreak);
                }, 5500)

                setTimeout(() => {
                    starContainerPermenant1.tweenGroups[0].startAllTweens();
                    blur.tweenGroups[2].startAllTweens();
                    //exitSfx.play();
                }, 7500)
            }, 100)
        }

        this.sceneManager.pixiAppManager.interposerObject = startAnimChain;
        console.log(this.sceneManager.pixiAppManager.interposerObject);
    }

    unload() {
        super.unload();
    }
}

export default StarfieldScene;