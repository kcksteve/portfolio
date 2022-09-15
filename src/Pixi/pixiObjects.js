import sonicImg from '../images/sonic.png';

const PIXIOBJECTS = [
    {
        id: 0,
        type: 'sprite',
        name: 'sonic',
        image: sonicImg,
        translation: {
            anchor: {
                x: 0.5,
                y: 0.5
            },
            scale: {
                x: 2,
                y: 2
            },
            position: {
                x: 100,
                y: 0,
                z: 0
            },
            angle: 0
        }
    }
]

export default PIXIOBJECTS;