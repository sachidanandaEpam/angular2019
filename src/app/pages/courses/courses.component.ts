import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    console.log(`CoursesComponent being destroyed.`);
  }

  constructor() {
    console.log('CoursesComponent Constructor called');
  }

  ngOnInit() {
    console.log('Initializing CoursesComponent inside ngOnInit.');
  }
}
