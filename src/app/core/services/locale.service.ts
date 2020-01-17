import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { DateTimeAdapter } from 'ng-pick-datetime';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  public readonly defaultLanguage = 'en';

  constructor(private _translate: TranslateService, private _dateTimeAdapter: DateTimeAdapter<any>) { }

  public initialize() {
    this._translate.setDefaultLang(this.defaultLanguage);
    this.useLocale(this._translate.getBrowserCultureLang());
  }

  private useLocale(locale: string): void {
    if (this._translate.langs.includes(locale)) {
      this._translate.use(locale);
    }
    moment.locale(locale);
    this._dateTimeAdapter.setLocale(locale);
  }
}
