//Class to centralize the easing methods and select them based on values
class PixiEasings {
    //Select a easing method by the matching string
    getMethodByName(name) {
        switch(name) {
            case 'linear':
                return this.easeLinear;
            case 'inQuad':
                return this.easeInQuad;
            case 'outQuad':
                return this.easeOutQuad;
            case 'inOutQuad':
                return this.easeInOutQuad;
            case 'inCubic':
                return this.easeInCubic;
            case 'outCubic':
                return this.easeOutCubic;
            case 'inOutCubic':
                return this.easeInOutCubic;
            case 'inQuint':
                return this.easeInQuint;
            case 'outQuint':
                return this.easeOutQuint;
            case 'inOutQuint':
                return this.easeInOutQuint;
            case 'inElastic':
                return this.easeInElastic;
            case 'outElastic':
                return this.easeOutElastic;
            case 'inOutElastic':
                return this.easeInOutElastic;
            default:
                return this.easeLinear;
        }
    }

    easeLinear(x) {
        return x;
    }

    easeInQuad(x) {
        return x * x;
    }

    easeOutQuad(x) {
        return 1 - (1 - x) * (1 - x);
    }

    easeInOutQuad(x) {
        return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    }

    easeInCubic(x) {
        return x * x * x;
    }

    easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3);
    }

    easeInOutCubic(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    easeInQuint(x) {
        return x * x * x * x * x;
    }

    easeOutQuint(x) {
        return 1 - Math.pow(1 - x, 5);
    }

    easeInOutQuint(x) {
        return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
    }

    easeInElastic(x) {
        const c4 = (2 * Math.PI) / 3;
        return x === 0
            ? 0
            : x === 1
            ? 1
            : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
    }

    easeOutElastic(x) {
        const c4 = (2 * Math.PI) / 3;
        return x === 0
            ? 0
            : x === 1
            ? 1
            : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    }

    easeInOutElastic(x) {
        const c5 = (2 * Math.PI) / 4.5;
        return x === 0
            ? 0
            : x === 1
            ? 1
            : x < 0.5
            ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
            : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
    }
 }

export default PixiEasings;