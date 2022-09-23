import PIXILAYERS from './pixiLayers';
import PIXITWEENS from './PixiHelpers/PixiTweens';
import sonicImg from '../images/sonic.png';

const PIXIOBJECTS = [
    {
        id: 0,
        type: 'sprite',
        name: 'sonic',
        image: sonicImg,
        anchorX: 0.5,
        anchorY: 0.5,
        scaleX: 2,
        scaleY: 2,
        positionX: 0,
        positionY: 0,
        positionZ: PIXILAYERS.background,
        angle: 90,
        opacity: 0.5,
        // children: [
        //     {
        //         id: 0,
        //         scaleX: 1,
        //         scaleY: 1,
        //         children: null
        //     }
        // ]
        tweens: [
            {
                name: 'test1',
                tweenType: PIXITWEENS.scale,
                runtime: 2000,
                startDelay: 2000,
                easing: 'inOutQuad',
                playAtStart: true,
                isLooping: true,
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

export default PIXIOBJECTS;