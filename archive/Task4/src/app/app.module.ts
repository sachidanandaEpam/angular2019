import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { BreadCrumbComponent } from './core/components/bread-crumb/bread-crumb.component';
import { CourseListComponent } from './modules/courses/course-list/course-list.component';
import { SearchCoursesComponent } from './modules/courses/search-courses/search-courses.component';
import { CourseItemComponent } from './modules/courses/course-item/course-item.component';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { DurationPipe } from './core/pipes/duration.pipe';
import { FormatCourseItemDirective } from './core/directives/format-course-item.directive';
import { SortItemsPipe } from './core/pipes/sort-items.pipe';
import { FilterItemsPipe } from './core/pipes/filter-items.pipe';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CoursesComponent,
    BreadCrumbComponent,
    CourseListComponent,
    SearchCoursesComponent,
    CourseItemComponent,
    PageNotFoundComponent,
    DurationPipe,
    FormatCourseItemDirective,
    SortItemsPipe,
    FilterItemsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    AuthenticationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
