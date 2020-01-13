import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CourseItemDetailsComponent } from '../shared/components/course-item-details/course-item-details.component';
import { CourseItemComponent } from '../shared/components/course-item/course-item.component';
import { SharedModule } from '../shared/shared.module';
import { CourseDetailsContainerComponent } from './course-details-container/course-details-container.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CoursesComponent } from './courses/courses.component';
import { NewCourseComponent } from './courses/new-course/new-course.component';
import { SearchCoursesComponent } from './courses/search-courses/search-courses.component';
import { LoginFormComponent } from './login/login-form.component';
import { LoginPageComponent } from './login/login-page.component';


const COMPONENTS = [
    CourseItemComponent,
    CourseListComponent,
    SearchCoursesComponent,
    CoursesComponent,
    LoginFormComponent,
    LoginPageComponent,
    CourseItemDetailsComponent,
    CourseDetailsContainerComponent,
    NewCourseComponent
];

@NgModule({
    declarations: [
        ...COMPONENTS
    ],
    imports: [
        SharedModule,
        TranslateModule
    ],
    exports: [
        ...COMPONENTS
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
