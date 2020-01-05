import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { environment } from 'src/environments/environment';
import { appConfig } from './app-config';
import { AuthGuard } from './guards/auth.guard';
import { ApiService } from './http/api.service';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { AppConfig } from './models/app-config.model';
import { SessionManagerConfig } from './session-manager/config/session-manager-config';
import { APP_STORAGE_CONFIG } from './session-manager/config/session-manager-token';
import { AuthEffects } from './store/effects';
import { ItemsEffects } from './store/effects/items.effects';
import { reducers } from './store/reducers';
import { globalFeatureKey } from './store/state';

const PROVIDERS = [
  ApiService,
  AuthGuard
];

const EXPORTS = [
  NgxSmartModalModule
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxSmartModalModule.forRoot(),
    StoreModule.forFeature(globalFeatureKey, reducers),
    EffectsModule.forFeature([AuthEffects, ItemsEffects]),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }) : [],
  ],
  exports: [
    ...EXPORTS
  ],
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

  public static forRoot({ config }: { config: SessionManagerConfig }): ModuleWithProviders {
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
