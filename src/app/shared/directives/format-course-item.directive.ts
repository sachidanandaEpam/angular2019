import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { CourseItem } from 'src/app/core/models/course-item.model';
import * as moment from 'moment';

@Directive({
  selector: '[appFormatCourseItem]'
})
export class FormatCourseItemDirective {

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.el = el;
  }

  @Input() set appFormatCourseItem(item: CourseItem) {
    const currentTime = moment();
    const creationTime = moment(item.creationTime);
    const dayDiff = currentTime.diff(creationTime, 'days');
    if (dayDiff <= 14 && dayDiff > 0) {
      this.renderer.addClass(this.el.nativeElement, 'item-fresh');
    } else if (dayDiff < 0) {
      this.renderer.addClass(this.el.nativeElement, 'item-released');
    }
  }
}
