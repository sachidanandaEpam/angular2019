import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoursesComponent } from './courses/courses.component';
import { LoginComponent } from './login/login.component';
import { CourseItemComponent } from '../shared/components/course-item/course-item.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { SearchCoursesComponent } from './courses/search-courses/search-courses.component';
import { SharedModule } from '../shared/shared.module';
import { CourseItemDetailsComponent } from '../shared/components/course-item-details/course-item-details.component';
import { NewCourseComponent } from './courses/new-course/new-course.component';


const COMPONENTS = [
    CourseItemComponent,
    CourseListComponent,
    SearchCoursesComponent,
    CoursesComponent,
    LoginComponent,
    CourseItemDetailsComponent,
    NewCourseComponent
];

@NgModule({
    declarations: [
        ...COMPONENTS
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ...COMPONENTS
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
