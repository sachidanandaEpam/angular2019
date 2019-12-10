import { AppConfig } from './models/app-config.model';
import { environment } from '../../environments/environment.prod';

export const appConfig: AppConfig = {
    ...environment.config
};
