import { SessionStrategy } from '../strategy/session-strategy';

export class LocalStorage extends SessionStrategy {
    constructor() {
        super();
        this.init();
    }

    private init() {
        console.log('Initialized local storage');
    }

    public getStorage() {
        return window.localStorage;
    }
}
