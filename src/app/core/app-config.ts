import { AppConfig } from './models/app-config.model';
import { environment } from '../../environments/environment';

export const appConfig: AppConfig = {
    ...environment.config
};
