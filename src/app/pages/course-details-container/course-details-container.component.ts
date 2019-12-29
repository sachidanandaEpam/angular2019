import { Component, OnInit } from '@angular/core';
import { ItemStates } from 'src/app/core/store/state';
import { Store } from '@ngrx/store';

import * as AppReducer from 'src/app/core/store/reducers';
import { Observable } from 'rxjs';
import { CourseItem } from 'src/app/core/models';
import { ActivatedRoute } from '@angular/router';
import { ItemActions } from 'src/app/core/store/actions';

@Component({
  selector: 'app-course-details-container',
  templateUrl: './course-details-container.component.html',
  styleUrls: ['./course-details-container.component.scss']
})
export class CourseDetailsContainerComponent implements OnInit {

  public item$: Observable<CourseItem>;

  constructor(private route: ActivatedRoute, private store: Store<ItemStates.IItemState>) {
    this.item$ = this.store.select(AppReducer.selectSelectedItem);
  }

  public ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(ItemActions.loadItemById({ id: Number(id) }));
    }
  }

  public submit(item: CourseItem) {
      this.store.dispatch(ItemActions.updateItem({ item }));
  }

  public isReadOnly(): boolean {
    if (this.route.snapshot.data.breadcrumb === 'Detail') {
      return true;
    }
    return false;
  }

}
