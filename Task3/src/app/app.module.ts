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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CoursesComponent,
    BreadCrumbComponent,
    CourseListComponent,
    SearchCoursesComponent,
    CourseItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
