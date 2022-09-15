import PIXILAYERS from './pixiLayers';
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
        positionX: 200,
        positionY: 200,
        positionZ: PIXILAYERS.background,
        angle: 90,
        children: [
            {
                id: 0,
                scaleX: 1,
                scaleY: 1,
                children: null
            }
        ]
    }
]

export default PIXIOBJECTS;