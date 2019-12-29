import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CourseItem, ItemCriteria } from 'src/app/core/models/course-item.model';
import { ItemActions } from 'src/app/core/store/actions';
import * as AppReducer from 'src/app/core/store/reducers';
import { ItemStates } from 'src/app/core/store/state';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  public items$: Observable<CourseItem[]>;
  public criteria$: Observable<ItemCriteria>;

  private _actionStatus = '';

  public get actionStatus(): string {
    return this._actionStatus;
  }

  constructor(private store: Store<ItemStates.IItemState>) { }

  public ngOnInit() {
    this.criteria$ = this.store.select(AppReducer.selectCriteria);

    this.items$ = this.store.pipe(
      select(AppReducer.selectCriteria),
      map(criteria => this.store.dispatch(ItemActions.loadItems({ criteria }))),
      switchMap(() => this.store.select(AppReducer.selectItems))
    );
  }

  public delete(item: CourseItem) {
    this.store.dispatch(ItemActions.deleteItem({ item }));
  }

  public loadMore(numOfCourse: number) {
    this.store.pipe(
      select(AppReducer.selectCriteria),
      tap((criteria) => criteria.count = criteria.count + numOfCourse),
      map(criteria => this.store.dispatch(ItemActions.loadItems({ criteria })))
    ).subscribe();
  }

  public filterItem(searchText: string) {
    // this.items = searchText ? this.filterPipe.transform(this.items, searchText) : this.itemsService.get();
    this.store.pipe(
      select(AppReducer.selectCriteria),
      tap((criteria) => criteria.textFragment = searchText),
      map(criteria => this.store.dispatch(ItemActions.loadItems({ criteria })))
    ).subscribe();
  }
}
