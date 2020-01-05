import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject, Subscription, of } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, mergeMap, delay, filter } from 'rxjs/operators';

const debounceTimeInMillis = 1000;
const delyInMillis = 500;

@Component({
  selector: 'app-search-courses',
  templateUrl: './search-courses.component.html',
  styleUrls: ['./search-courses.component.scss']
})
export class SearchCoursesComponent implements OnDestroy {

  public searchText = '';

  public keyUp = new Subject<KeyboardEvent>();
  private subscription: Subscription;
  @Output() public searchItem = new EventEmitter<string>();

  constructor() {
    this.subscription = this.keyUp.pipe(
      map(e => (e.target as HTMLInputElement).value),
      filter(text => (text.length > 2 || text.length === 0)),
      debounceTime(debounceTimeInMillis),
      distinctUntilChanged(),
      mergeMap(search => of(search).pipe(
        delay(delyInMillis),
      )),
    ).subscribe(search => {
        this.searchItem.emit(search);
      });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
