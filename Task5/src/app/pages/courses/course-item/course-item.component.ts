import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { CourseItem } from 'src/app/entities/course-item';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnChanges {
  @Input() item: CourseItem;

  @Output() deleteItem = new EventEmitter<CourseItem>();
  @Output() editItem = new EventEmitter<CourseItem>();

  currentTime = Date.now();

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  deleteCourse() {
    if (confirm(`Do you really want to delete the course '${this.item.title}'?`)) {
      this.deleteItem.emit(this.item);
    }
  }

  editCourse() {
    this.editItem.emit(this.item);
  }
}
