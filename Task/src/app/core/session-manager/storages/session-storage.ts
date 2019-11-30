import { SessionStrategy } from '../strategy/session-strategy';

export class SessionStorage extends SessionStrategy {
    constructor() {
        super();
        this.init();
    }

    private init() {
        console.log('Initialized session storage');
    }

    public getStorage() {
        return window.sessionStorage;
    }
}
