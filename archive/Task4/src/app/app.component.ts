import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'Task 4';

  ngOnInit(): void {
    this.setTitle(this.title);
  }
  public constructor(private titleService: Title) { }


  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public getTitle(): string {
    return this.titleService.getTitle();
  }
}
