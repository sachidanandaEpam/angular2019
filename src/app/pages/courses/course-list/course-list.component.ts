import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CourseItem, ItemCriteria } from 'src/app/core/models/course-item.model';
import { ItemActions } from 'src/app/core/store/actions';
import { ItemSelectors } from 'src/app/core/store/selectors';
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
    this.criteria$ = this.store.select(ItemSelectors.selectCriteria);

    this.items$ = this.store.pipe(
      select(ItemSelectors.selectCriteria),
      map(criteria => this.store.dispatch(ItemActions.loadItems({ criteria }))),
      switchMap(() => this.store.select(ItemSelectors.selectItems))
    );
  }

  public delete(item: CourseItem) {
    this.store.dispatch(ItemActions.deleteItem({ item }));
  }

  public loadMore(numOfCourse: number) {
    this.store.pipe(
      select(ItemSelectors.selectCriteria),
      tap((criteria) => criteria.count = criteria.count + numOfCourse),
      map(criteria => this.store.dispatch(ItemActions.loadItems({ criteria })))
    ).subscribe();
  }

  public filterItem(searchText: string) {
    // this.items = searchText ? this.filterPipe.transform(this.items, searchText) : this.itemsService.get();
    this.store.pipe(
      select(ItemSelectors.selectCriteria),
      tap((criteria) => criteria.textFragment = searchText),
      map(criteria => this.store.dispatch(ItemActions.loadItems({ criteria })))
    ).subscribe();
  }
}
