import { SessionStorage } from '../storages/session-storage';
import { LocalStorage } from '../storages/local-storage';
import { StrategyType } from 'src/app/shared/strategy-type.enum';

export class SessionContext {
    public sessionStrategy: StrategyType;

    constructor(sessionStrategy: StrategyType) {
        this.sessionStrategy = sessionStrategy;
    }

    public loadStorage() {
        if (this.sessionStrategy === StrategyType.SESSION) {
            return new SessionStorage();
        } else {
            return new LocalStorage();
        }
    }
}
