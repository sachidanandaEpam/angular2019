import { Component, OnInit } from '@angular/core';
import { CourseItem } from 'src/app/entities/course-item';
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

  update(inputItem: CourseItem) {
    const response = this.itemsService.update(inputItem);
    if (response.statusCode < 400) {
      this.actionStatus = `Edited ${inputItem.title}`;
    } else {
      this.actionStatus = `${inputItem.title} not found. No action taken`;
    }
  }

  addCourse() {
    this.itemsService.create({
      title: `Typescript Introduction`,
      description: `Learn about where you can find course descriptions`,
      durationInMins: 300,
      courseTime: Date.parse('01/29/2020 12:00'),
      creationTime: Date.parse('11/15/2019 9:00'),
      isTopRated: false
    });
    this.actionStatus = `Added ${this.items[this.items.length - 1].title}`;
  }

  filterItem(searchText: string) {
    this.items = searchText ? this.filterPipe.transform(this.items, searchText) : this.itemsService.get();
  }
}
