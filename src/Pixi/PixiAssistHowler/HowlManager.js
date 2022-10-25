import { Howl } from 'howler';

class HowlManager {
    howls = [];
    isLoaded = false;
    onLoadedCallback = null;
    preloadCount = 0;
    preloadedCount = 0;
    boundHowlLoaded;

    constructor(howlObjects) {
        this.boundHowlLoaded = () => this.howlLoaded();

        howlObjects.forEach(howlObject => {
            this.#addHowl(howlObject);
        });
    }

    #addHowl(howlObject) {
        const howlConfig = {...howlObject}

        if (howlObject.hasOwnProperty('preload') && howlObject.preload) {
            this.preloadCount += 1;
            howlConfig.onload = this.boundHowlLoaded;
        }

        const howl = new Howl(howlConfig);
        this.howls.push(howl);
    }

    howlLoaded() {
        this.preloadedCount += 1

        if (this.preloadCount === this.preloadedCount) {
            this.isLoaded = true;

            if (this.onLoadedCallback) {
                this.onLoadedCallback();
            }
        }
    }
}

export default HowlManager