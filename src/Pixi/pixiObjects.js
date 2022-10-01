import PIXILAYERS from './pixiLayers';
import PIXITWEENS from './PixiHelpers/Behaviors/PixiTweens';
import smallStarImg from '../images/SmallStar.png';
import streakStarImg from '../images/StreakStar.png';
import cover from '../images/1080.png';

const PIXIOBJECTS = [
    {
        id: 0,
        type: 'sprite',
        name: 'SmallStar',
        image: smallStarImg,
        scaleX: 0.5,
        scaleY: 0.5,
        // tweenGroups: [
        //     {
        //         name: 'group1',
        //         tweens: [
        //             {
        //                 name: 'test1',
        //                 tweenType: PIXITWEENS.scale,
        //                 runtime: 2000,
        //                 startDelay: 2000,
        //                 easing: 'inOutQuad',
        //                 playAtStart: true,
        //                 isLooping: false,
        //                 targetFrom: {
        //                     x: 1,
        //                     y: 1
        //                 },
        //                 targetTo: {
        //                     x: 2,
        //                     y: 2
        //                 }
        //             },
        //             {
        //                 name: 'test2',
        //                 tweenType: PIXITWEENS.position,
        //                 runtime: 4000,
        //                 startDelay: 2000,
        //                 easing: 'inOutQuad',
        //                 playAtStart: true,
        //                 isLooping: false,
        //                 targetFrom: {
        //                     x: 0,
        //                     y: 0
        //                 },
        //                 targetTo: {
        //                     x: 100,
        //                     y: 100
        //                 }
        //             }
        //         ],
        //         onFinishedCallback: function() {console.log('yay done')}
        //     }
        //]
    },
    {
        id: 1,
        type: 'sprite',
        name: 'Cover',
        image: cover,
    }
]

export default PIXIOBJECTS;