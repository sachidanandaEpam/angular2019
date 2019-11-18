import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, InjectionToken, Optional, SkipSelf } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ItemsService } from './services/items.service';
import { AppStorageService, APP_STORAGE } from './services/app-storage.service';

const PROVIDERS = [
  AppStorageService,
  AuthService,
  ItemsService
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
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.')
    }
  }

  static forRoot({ storage }: { storage: Storage }): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: APP_STORAGE,
          useValue: storage,
        },
        ...PROVIDERS
      ]
    };
  }
}
