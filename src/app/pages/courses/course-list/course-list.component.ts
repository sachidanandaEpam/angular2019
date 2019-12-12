import { Component, OnInit } from '@angular/core';
import { CourseItem } from 'src/app/core/models/course-item.model';
import { ItemsService } from 'src/app/core/services/items.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  private items: CourseItem[];

  private start: number;
  private count: number;
  private textFragment: string;

  private actionStatus = '';

  constructor(private itemsService: ItemsService) { }

  public ngOnInit() {
    this.start = 0, this.count = 1, this.textFragment = '';
    this.getItems();
  }

  private getItems(searchText: string = this.textFragment, start: number = this.start, count: number = this.count): void {
    this.itemsService.get(start, count, searchText).subscribe(
      result => this.items = result
    );
  }

  public delete(inputItem: CourseItem) {
    this.itemsService.delete(inputItem).subscribe(
      () => {
        this.getItems();
        this.actionStatus = `Deleted ${inputItem.title}`;
      }
    );
  }

  public loadMore(numOfCourse: number) {
    this.count = this.count + numOfCourse;
    this.getItems();
  }

  public filterItem(searchText: string) {
    // this.items = searchText ? this.filterPipe.transform(this.items, searchText) : this.itemsService.get();
    this.textFragment = searchText;
    this.getItems();
  }
}
