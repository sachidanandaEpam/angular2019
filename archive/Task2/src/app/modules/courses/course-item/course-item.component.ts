import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {

  @Input() item: any;

  @Output() deleteEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() editEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  deleteCourse() {
    this.deleteEvent.emit(`Deleting ${this.item.courseTitle} course with id ${this.item.id}`);
  }

  editCourse() {
    this.editEvent.emit(`Editing ${this.item.courseTitle} course with id ${this.item.id}`);
  }
}
