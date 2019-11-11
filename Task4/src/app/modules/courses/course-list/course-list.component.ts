import { Component, OnInit, OnChanges, SimpleChanges, ModuleWithComponentFactories } from '@angular/core';
import { CourseItem } from 'src/app/entities/course-item';
import { FilterItemsPipe } from 'src/app/core/pipes/filter-items.pipe';
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
    this.items = this.itemsService.getItems();
  }

  delete(inputItem: CourseItem) {
    const selectedItem = this.items.filter(e => e.id === inputItem.id);
    const itemIndex = selectedItem.length > 0 ? this.items.indexOf(selectedItem[0]) : -1;
    if (itemIndex >= 0) {
      this.actionStatus = `Deleted ${inputItem.title}`;
      this.items.splice(itemIndex, 1);
    } else {
      this.actionStatus = `${inputItem.title} not found. No action taken`;
    }
  }

  update(inputItem: CourseItem) {
    const selectedItem = this.items.filter(e => e.id === inputItem.id);
    const itemIndex = selectedItem.length > 0 ? this.items.indexOf(selectedItem[0]) : -1;
    if (itemIndex >= 0) {
      this.actionStatus = `Edited ${inputItem.title}`;
      this.items[itemIndex] = inputItem;
    } else {
      this.actionStatus = `${inputItem.title} not found. No action taken`;
    }
  }

  addCourse() {
    const currentItemsCount = this.items.length;
    this.items.push({
      id: currentItemsCount,
      title: `Typescript Introduction ${currentItemsCount}`,
      description: `Learn about where you can find course descriptions ${currentItemsCount}`,
      durationInMins: 300,
      courseTime: Date.parse('01/29/2020 12:00'),
      creationTime: Date.parse('11/15/2019 9:00'),
      isTopRated: false
    });
    this.actionStatus = `Added ${this.items[this.items.length - 1].title}`;
  }

  filterItem(searchText: string) {
    this.items = searchText ? this.filterPipe.transform(this.items, searchText) : this.itemsService.getItems();
  }
}
