import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, NavigationEnd, ActivationEnd, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { BreadCrumb } from 'src/app/models/bread-crumb';
import { filter } from 'rxjs/operators';
import { ItemsService } from 'src/app/core/services/items.service';

/**
 * Check if an angular router 'Event' is instance of 'NavigationEnd' event
 */
const isNavigationEnd = (ev: Event) => ev instanceof NavigationEnd;
/**
 * Check if an angular router 'Event' is instance of 'NavigationEnd' event
 */
const isActivationEnd = (ev: Event) => ev instanceof ActivationEnd;

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';

  private breadcrumbs: BreadCrumb[];

  constructor(private authService: AuthService, private itemsService: ItemsService,
              private activatedRoute: ActivatedRoute, private router: Router) {
    this.breadcrumbs = [];
  }

  ngOnInit(): void {
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
      let label = child.snapshot.data[BreadCrumbComponent.ROUTE_DATA_BREADCRUMB];

      console.log(`label ${label} menuItems ${JSON.stringify(menuItems)}`);

      const id = Number(child.snapshot.params.id);
      if (id && id > 0) {
        const item = this.itemsService.getById(id);
        console.log(menuItems.find(e => e.label !== item.title));
        if (!menuItems.find(e => e.label === item.title)) {
          label = item.title;
        }
      }

      if (routeURL !== '') {
        path += `/${routeURL}`;
      }

      if (!isNullOrUndefined(label)) {
        menuItems.push({ path, label });
      }

      return this.createBreadcrumbs(child, path, menuItems);
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isLastItem(index: number): boolean {
    return index === this.breadcrumbs.length - 1;
  }
}
