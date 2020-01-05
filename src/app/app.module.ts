import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { SessionManagerConfig } from './core/session-manager/config/session-manager-config';
import { StrategyType } from './shared/strategy-type.enum';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

const sessionConfig: SessionManagerConfig = {
  strategyType: StrategyType.SESSION
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    }),

    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument({
      name: 'Video Courses App',

      // In a production build you would want to disable the Store Devtools
      // logOnly: environment.production,
    }) : [],
    CoreModule.forRoot({ config: sessionConfig }),
    SharedModule,
    PagesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
