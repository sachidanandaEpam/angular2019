import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ItemCriteria } from '../../models';
import { ItemsService } from '../../services/items.service';
import { ItemActions } from '../actions';
import { ItemSelectors } from '../selectors';
import { ItemStates } from '../state';

@Injectable()
export class ItemsEffects {

  constructor(
    private actions$: Actions,
    private itemService: ItemsService,
    private store$: Store<ItemStates.IItemState>
  ) {}

  public loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.loadItems),
      map(action => action.criteria),
      exhaustMap((criteria: ItemCriteria) =>
        this.itemService.get(criteria).pipe(
          map(items => ItemActions.loadItemsSuccess({ items, criteria })),
          catchError(error => of(ItemActions.itemError({ error })))
        )
      ),
    )
  );

  public loadItemById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.loadItemById),
      map(action => action.id),
      exhaustMap((id) =>
        this.itemService.getById(id).pipe(
          map(selectedItem => ItemActions.loadItemByIdSuccess({ selectedItem })),
          catchError(error => of(ItemActions.itemError({ error })))
        )
      ),
    )
  );

  public deleteItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.deleteItem),
      map(action => action.item),
      withLatestFrom(this.store$.select(ItemSelectors.selectCriteria)),
      exhaustMap(([deletedItem, criteria]) =>
        this.itemService.delete(deletedItem.id).pipe(
          switchMap(() => [
            ItemActions.deleteItemSuccess({ deletedItem }),
            ItemActions.loadItems({ criteria })
          ]),
          catchError(error => of(ItemActions.itemError({ error })))
        )
      )
    )
  );

  public updateItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.updateItem),
      map(action => action.item),
      exhaustMap((item) =>
        this.itemService.update(item).pipe(
          map((selectedItem) => ItemActions.loadItemByIdSuccess({selectedItem})),
          catchError(error => of(ItemActions.itemError({ error })))
        )
      )
    )
  );

  public createItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemActions.createItem),
      map(action => action.item),
      exhaustMap((createdItem) =>
        this.itemService.create(createdItem).pipe(
          map(() => ItemActions.createItemSuccess({createdItem})),
          catchError(error => of(ItemActions.itemError({ error })))
        )
      )
    )
  );

}
