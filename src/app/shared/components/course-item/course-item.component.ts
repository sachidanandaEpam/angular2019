import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CourseItem } from 'src/app/core/models/course-item.model';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent implements OnChanges {
  @Input() public item: CourseItem;

  @Output() public deleteItem = new EventEmitter<CourseItem>();

  private currentTime = Date.now();

  public ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  public deleteCourse() {
    if (confirm(`Do you really want to delete the course '${this.item.title}'?`)) {
      this.deleteItem.emit(this.item);
    }
  }
}
