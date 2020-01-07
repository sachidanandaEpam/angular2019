import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppConfig } from './core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title: string;

  public ngOnInit(): void {
    this.setTitle(this.title);
  }
  public constructor(private _title: Title, private _appConfig: AppConfig) {
    this.title = this._appConfig.title;
  }


  public setTitle(newTitle: string) {
    this._title.setTitle(newTitle);
  }

  public getTitle(): string {
    return this._title.getTitle();
  }
}
