import PixiScene from "../PixiHelpers/PixiScene";
import PIXITWEENS from '../PixiHelpers/Behaviors/PixiTweens';
import PixiAppManager from "../PixiHelpers/PixiAppManager";
import PixiSceneManager from "../PixiHelpers/PixiSceneManager";

class StarfieldScene extends PixiScene {
    name = 'starfield';
    isDefault = true;
    howls = this.sceneManager.pixiAppManager.howlManager.howls;

    //Animation objects
    blur;
    starContainer;
    starContainerFade1;
    starContainerFade2;
    starContainerFade3;
    starContainerPermenant1;
    starContainerPermenant2;
    starContainerMoving;
    starContainerStreak;
    starContainerStreakBurst;

    constructor(sceneManager, pixiObjects) {
        super(sceneManager, pixiObjects);
    }

    load(parent) {
        super.load(parent);

        this.blur = this.pixiObjectConstructor.constructById(
            7,
            this.container
        );

        this.starContainer = this.pixiObjectConstructor.constructById(
            4,
            this.container
        );

        this.starContainerFade1 = this.makeStarContainerFade(0, 1900);
        this.starContainerFade2 = this.makeStarContainerFade(0, 2150);
        this.starContainerFade3 = this.makeStarContainerFade(0, 2600);

        this.starContainerPermenant1 = this.pixiObjectConstructor.constructById(
            8,
            this.starContainer
        );

        this.starContainerPermenant2 = this.pixiObjectConstructor.constructById(
            9,
            this.starContainer
        );

        this.starContainerMoving = this.pixiObjectConstructor.constructById(
            6,
            this.starContainer,
        );

        this.starContainerStreak = this.pixiObjectConstructor.constructById(
            6,
            this.starContainer,
        );

        this.starContainerStreakBurst = this.pixiObjectConstructor.constructById(
            6,
            this.starContainer,
        );

        this.staticStars(0, 350, this.starContainerFade1);
        this.staticStars(1, 50, this.starContainerFade1);
        this.staticStars(0, 350, this.starContainerFade2);
        this.staticStars(1, 50, this.starContainerFade2);
        this.staticStars(0, 350, this.starContainerFade3);
        this.staticStars(0, 100, this.starContainerPermenant1);
        this.staticStars(0, 3, this.starContainerPermenant2, 200);
        this.staticStars(0, 10, this.starContainerPermenant2, 1000);

        this.sceneManager.pixiAppManager.interposerObject.startAnimFunc = () => this.startAnimChain();

        setTimeout(() => {
            this.sceneManager.pixiAppManager.interposerObject.showLaunchBtnFunc(true);
        }, 3000);
    }

    unload() {
        super.unload();
    }

    makeStarContainerFade(delay, runtime) {
        return this.pixiObjectConstructor.constructById(
            6,
            this.starContainer,
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

    staticStars(starId, starCount, container, dist) {
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

    streakStars() {
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
                this.starContainerStreak,
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

    streakStarBurst() {
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
                this.starContainerStreakBurst,
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

    movingStars() {
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
                this.starContainerMoving,
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

    stopChildrenTweenGroupsLooping(obj) {
        obj.children.forEach(child => {
            child.tweenGroups.forEach(tweenGroup => {
                tweenGroup.isLooping = false;
            });
        });
    }

    startAnimChain() {
        this.sceneManager.pixiAppManager.interposerObject.showLaunchBtnFunc(false);
        const playSound = this.sceneManager.pixiAppManager.interposerObject.playSfx;
        console.log(this.sceneManager.pixiAppManager.interposerObject);
        if (playSound) { this.howls[0].play(); }

        setTimeout(() => {
            this.starContainerFade1.tweenGroups[0].startAllTweens();
            this.starContainerFade2.tweenGroups[0].startAllTweens();
            this.starContainerFade3.tweenGroups[0].startAllTweens();
            this.starContainerPermenant2.tweenGroups[0].startAllTweens();
            this.starContainerPermenant2.tweenGroups[1].startAllTweens();
            this.blur.tweenGroups[0].startAllTweens();

            this.streakStarBurst();
            this.streakStars();
            this.movingStars();

            setTimeout(() => {
                this.stopChildrenTweenGroupsLooping(this.starContainerStreakBurst);
                this.blur.tweenGroups[1].startAllTweens();
                if (playSound) { this.howls[1].play(); }
            }, 1000)

            setTimeout(() => {
                this.stopChildrenTweenGroupsLooping(this.starContainerMoving);
            }, 5000)

            setTimeout(() => {
                this.stopChildrenTweenGroupsLooping(this.starContainerStreak);
            }, 5500)

            setTimeout(() => {
                this.sceneManager.pixiAppManager.interposerObject.showSiteFunc(true);
                this.starContainerPermenant1.tweenGroups[0].startAllTweens();
                this.blur.tweenGroups[2].startAllTweens();
                if (playSound) { this.howls[2].play(); }
            }, 7500)
        }, 100)
    }
}

export default StarfieldScene;