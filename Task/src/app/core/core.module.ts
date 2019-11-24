import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, InjectionToken, Optional, SkipSelf } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ItemsService } from './services/items.service';
import { APP_STORAGE_CONFIG } from './session-manager/config/session-manager-token';
import { SessionManagerConfig } from './session-manager/config/session-manager-config';
import { SessionService } from './services/session.service';

const PROVIDERS = [
  AuthService,
  ItemsService,
  SessionService
];

@NgModule({
  imports: [CommonModule],
  providers: [
    ...PROVIDERS
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }

  static forRoot({ config }: { config: SessionManagerConfig }): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: APP_STORAGE_CONFIG,
          useValue: config,
        },
        ...PROVIDERS
      ]
    };
  }
}
