import PIXILAYERS from './pixiLayers';
import sonicImg from '../images/sonic.png';
import PixiTweenPosition from './PixiHelpers/PixiTweenPosition';

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
                tweenType: PixiTweenPosition,
                runtime: 2000,
                easing: 'linear',
                playAtStart: true,
                // targetFrom: {
                //     x: 200,
                //     y: 200
                // },
                targetTo: {
                    x: 300,
                    y: 300
                }
            }
        ]
    }
]

export default PIXIOBJECTS;