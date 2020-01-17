import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppConfig } from './core/models';
import { LocaleService } from './core/services/locale.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title: string;

  public ngOnInit(): void {
    this._locale.initialize();
    this.setTitle(this.title);
  }

  public constructor(
      private _title: Title, private _appConfig: AppConfig,
      private _locale: LocaleService) {
    this.title = this._appConfig.title;
  }


  public setTitle(newTitle: string) {
    this._title.setTitle(newTitle);
  }

  public getTitle(): string {
    return this._title.getTitle();
  }
}
