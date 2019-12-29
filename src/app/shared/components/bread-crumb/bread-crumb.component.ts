import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BreadCrumb } from 'src/app/core/models/bread-crumb.model';
import * as AppReducer from 'src/app/core/store/reducers';
import { AuthStates } from 'src/app/core/store/state';

/**
 * Check if an angular router 'Event' is instance of 'NavigationEnd' event
 */
const isNavigationEnd = (ev: Event) => ev instanceof NavigationEnd;
/**
 * Check if an angular router 'Event' is instance of 'NavigationEnd' event
 */
const isActivationEnd = (ev: Event) => ev instanceof ActivationEnd;
const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {

  public breadcrumbs: BreadCrumb[];
  public isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<AuthStates.IAuthState>,
              private activatedRoute: ActivatedRoute, private router: Router) {
    this.breadcrumbs = [];
  }

  public ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(AppReducer.selectLoggedIn);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root));
  }

  private createBreadcrumbs(route: ActivatedRoute, path: string = '', menuItems: BreadCrumb[] = []): BreadCrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return menuItems;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      let label = child.snapshot.data[ROUTE_DATA_BREADCRUMB];

      const id = Number(child.snapshot.params.id);
      if (id && id > 0) {
        this.store.select(AppReducer.selectSelectedItem).pipe(
          map(item => item.title)
        ).subscribe(
          result => {
            if (!menuItems.find(e => e.label === result)) {
              label = result;
            }
          }
        );
      }

      if (routeURL !== '') {
        path += `/${routeURL}`;
      }

      if (label !== null && label !== undefined) {
        menuItems.push({ path, label });
      }

      return this.createBreadcrumbs(child, path, menuItems);
    }
  }

  public isLastItem(index: number): boolean {
    return index === this.breadcrumbs.length - 1;
  }
}
