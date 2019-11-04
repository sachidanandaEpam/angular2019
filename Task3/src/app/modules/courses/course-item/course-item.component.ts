import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { CourseItem } from 'src/app/entities/course-item';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnChanges {
  @Input() item: CourseItem;

  @Output() deleteItem = new EventEmitter<string>();
  @Output() editItem = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  deleteCourse() {
    this.deleteItem.emit(`Deleting ${this.item.title} course with id ${this.item.id}`);
  }

  editCourse() {
    this.editItem.emit(`Editing ${this.item.title} course with id ${this.item.id}`);
  }
}
