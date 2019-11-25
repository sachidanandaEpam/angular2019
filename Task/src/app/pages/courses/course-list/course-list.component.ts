import { Component, OnInit } from '@angular/core';
import { CourseItem } from 'src/app/models/course-item';
import { FilterItemsPipe } from 'src/app/shared/pipes/filter-items.pipe';
import { ItemsService } from 'src/app/core/services/items.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers: [FilterItemsPipe]
})
export class CourseListComponent implements OnInit {
  items: CourseItem[];
  actionStatus = '';

  constructor(private filterPipe: FilterItemsPipe, private itemsService: ItemsService) { }

  ngOnInit() {
    this.items = this.itemsService.get();
  }

  getItems(): CourseItem[] {
    return this.itemsService.get();
  }

  delete(inputItem: CourseItem) {
    const response = this.itemsService.delete(inputItem);
    if (response.statusCode < 400) {
      this.actionStatus = `Deleted ${inputItem.title}`;
    } else {
      this.actionStatus = `Deletion of ${inputItem.title} failed.`;
    }
  }

  filterItem(searchText: string) {
    this.items = searchText ? this.filterPipe.transform(this.items, searchText) : this.itemsService.get();
  }
}
