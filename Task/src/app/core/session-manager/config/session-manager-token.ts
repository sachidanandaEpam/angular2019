import { InjectionToken, ModuleWithProviders } from '@angular/core';
import { SessionManagerConfig } from './session-manager-config';

export const APP_STORAGE_CONFIG = new InjectionToken<SessionManagerConfig>('config');
