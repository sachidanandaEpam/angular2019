import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { CourseDetailsContainerComponent } from './pages/course-details-container/course-details-container.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { NewCourseComponent } from './pages/courses/new-course/new-course.component';
import { LoginPageComponent } from './pages/login/login-page.component';
import { PageNotFoundComponent } from './shared/components/page-not-found';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full',
    data: {
      breadcrumb: 'Home'
    }
  },
  {
    path: 'courses',
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Courses'
    },
    children: [
      { path: '', component: CoursesComponent },
      {
        path: 'new', component: NewCourseComponent,
        data: {
          breadcrumb: 'New'
        }
      },
      {
        path: ':id',
        data: {
          breadcrumb: 'CourseName'
        },
        children: [
          { path: '', redirectTo: 'detail', pathMatch: 'full' },
          {
            path: 'edit', component: CourseDetailsContainerComponent,
            data: {
              breadcrumb: 'Edit'
            }
          },
          {
            path: 'detail', component: CourseDetailsContainerComponent,
            data: {
              breadcrumb: 'Detail'
            }
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
