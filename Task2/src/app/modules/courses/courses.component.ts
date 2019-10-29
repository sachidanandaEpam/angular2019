import { Component, OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnChanges, OnDestroy {
  ngOnChanges(changes: SimpleChanges): void {
    console.log(`On change event ${changes}`);
  }

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
