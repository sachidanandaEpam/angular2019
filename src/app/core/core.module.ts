import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { APP_STORAGE_CONFIG } from './session-manager/config/session-manager-token';
import { SessionManagerConfig } from './session-manager/config/session-manager-config';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { AppConfig } from './models/app-config.model';
import { appConfig } from './app-config';
import { ApiService } from './http/api.service';
import { AuthGuard } from './guards/auth.guard';

const PROVIDERS = [
  ApiService,
  AuthGuard
];

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: AppConfig,
      useValue: appConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
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
