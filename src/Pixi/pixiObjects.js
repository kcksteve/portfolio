import PIXILAYERS from './pixiLayers';
import PIXITWEENS from './PixiHelpers/Behaviors/PixiTweens';
import smallStarImg from '../images/SmallStar.png';
import largeStarImg from '../images/LargeStar.png';
import movingStarImg from '../images/MovingStar.png';
import streakStarImg from '../images/StreakStar.png';
import largeStreakStarImg from '../images/LargeStreakStar.png';
import blurImg from '../images/Blur.png';
import cover from '../images/1080.png';

const PIXIOBJECTS = [
    {
        id: 0,
        type: 'sprite',
        name: 'SmallStar',
        image: smallStarImg,
        scaleX: 0.5,
        scaleY: 0.5,
    },
    {
        id: 1,
        type: 'sprite',
        name: 'LargeStar',
        image: largeStarImg,
        scaleX: 0.5,
        scaleY: 0.5,
    },
    {
        id: 2,
        type: 'sprite',
        name: 'StreakStar',
        image: streakStarImg,
        scaleX: 0.5,
        scaleY: 0.5,
    },
    {
        id: 3,
        type: 'sprite',
        name: 'MovingStar',
        image: movingStarImg,
        scaleX: 0.5,
        scaleY: 0.5,
    },
    {
        id: 4,
        type: 'container',
        name: 'StarContainer',
        rotations: [
            {
                name: 'starSpin',
                degreesPerSecond: 1.5,
                playAtStart: true
            }
        ]
    },
    {
        id: 5,
        type: 'sprite',
        name: 'LargeStreakStar',
        image: largeStreakStarImg,
    },
    {
        id: 6,
        type: 'container',
        name: 'StarSubContainer'
    },
    {
        id: 7,
        type: 'sprite',
        name: 'Blur',
        image: blurImg,
        opacity: 0,
        tweenGroups: [
            {
                name: 'fadeInAndGrow',
                tweens: [
                    {
                        name: 'fadeIn',
                        tweenType: PIXITWEENS.opacity,
                        runtime: 250,
                        easing: 'outQuint',
                        targetFrom: {
                            x: 0,
                        },
                        targetTo: {
                            x: 0.05,
                        }
                    },
                    {
                        name: 'growIn',
                        tweenType: PIXITWEENS.scale,
                        runtime: 250,
                        easing: 'outQuint',
                        targetFrom: {
                            x: 1.5,
                            y: 1.5
                        },
                        targetTo: {
                            x: 3,
                            y: 3
                        }
                    }
                ]
            },
            {
                name: 'fadeOutAndShrink',
                tweens: [
                    {
                        name: 'fadeOut',
                        tweenType: PIXITWEENS.opacity,
                        runtime: 4500,
                        easing: 'inQuint',
                        targetFrom: {
                            x: 0.05,
                        },
                        targetTo: {
                            x: 0,
                        }
                    },
                    {
                        name: 'growOut',
                        tweenType: PIXITWEENS.scale,
                        runtime: 4500,
                        easing: 'inQuint',
                        targetFrom: {
                            x: 3,
                            y: 3
                        },
                        targetTo: {
                            x: 1.5,
                            y: 1.5
                        }
                    }
                ]
            },
            {
                name: 'fadeInAndOut',
                tweens: [
                    {
                        name: 'fadeIn',
                        tweenType: PIXITWEENS.opacity,
                        runtime: 150,
                        easing: 'outQuint',
                        targetFrom: {
                            x: 0,
                        },
                        targetTo: {
                            x: 0.05,
                        }
                    },
                    {
                        name: 'growIn',
                        tweenType: PIXITWEENS.scale,
                        runtime: 150,
                        easing: 'outQuint',
                        targetFrom: {
                            x: 1.5,
                            y: 1.5
                        },
                        targetTo: {
                            x: 3,
                            y: 3
                        }
                    },
                    {
                        name: 'fadeOut',
                        tweenType: PIXITWEENS.opacity,
                        runtime: 500,
                        startDelay: 150,
                        easing: 'inQuint',
                        targetFrom: {
                            x: 0.05,
                        },
                        targetTo: {
                            x: 0,
                        }
                    },
                    {
                        name: 'growOut',
                        tweenType: PIXITWEENS.scale,
                        runtime: 500,
                        startDelay: 150,
                        easing: 'inQuint',
                        targetFrom: {
                            x: 3,
                            y: 3
                        },
                        targetTo: {
                            x: 1.5,
                            y: 1.5
                        }
                    }
                ]
            },
        ]
    },
    {
        id: 8,
        type: 'container',
        name: 'StarSubContainerPermenant1',
        opacity: 0,
        scaleX: 0,
        scaleY: 0,
        tweenGroups: [
            {
                name: 'fadeInAndGrow',
                tweens: [
                    {
                        name: 'fadeIn',
                        tweenType: PIXITWEENS.opacity,
                        runtime: 2000,
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
                        runtime: 2000,
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
        ]
    },
    {
        id: 9,
        type: 'container',
        name: 'StarSubContainerPermenant2',
        opacity: 0,
        scaleX: 0,
        scaleY: 0,
        tweenGroups: [
            {
                name: 'fadeInAndGrow',
                tweens: [
                    {
                        name: 'fadeIn',
                        tweenType: PIXITWEENS.opacity,
                        runtime: 7500,
                        easing: 'linear',
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
                        runtime: 7500,
                        easing: 'linear',
                        targetFrom: {
                            x: 0,
                            y: 0
                        },
                        targetTo: {
                            x: 0.5,
                            y: 0.5
                        }
                    }
                ]
            },
            {
                name: 'finishGrow',
                tweens: [
                    {
                        name: 'growIn',
                        tweenType: PIXITWEENS.scale,
                        runtime: 2000,
                        startDelay: 7500,
                        easing: 'outQuint',
                        targetFrom: {
                            x: 0.5,
                            y: 0.5
                        },
                        targetTo: {
                            x: 0.8,
                            y: 0.8
                        }
                    }
                ]
            }
        ]
    }
]

export default PIXIOBJECTS;