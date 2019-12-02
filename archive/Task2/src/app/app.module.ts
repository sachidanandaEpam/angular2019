import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { SampleComponent } from './modules/sample/sample.component';
import { BreadCrumbComponent } from './core/components/bread-crumb/bread-crumb.component';
import { CourseListComponent } from './modules/courses/course-list/course-list.component';
import { SearchCoursesComponent } from './modules/search-courses/search-courses.component';
import { CourseItemComponent } from './modules/courses/course-item/course-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CoursesComponent,
    SampleComponent,
    BreadCrumbComponent,
    CourseListComponent,
    SearchCoursesComponent,
    CourseItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
