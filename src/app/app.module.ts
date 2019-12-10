import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { SessionManagerConfig } from './core/session-manager/config/session-manager-config';
import { StrategyType } from './shared/strategy-type.enum';

const sessionConfig: SessionManagerConfig = {
  strategyType: StrategyType.SESSION
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule.forRoot({ config: sessionConfig }),
    SharedModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
