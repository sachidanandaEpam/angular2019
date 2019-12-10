import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found';
import { CoursesComponent } from './pages/courses/courses.component';
import { LoginComponent } from './pages/login/login.component';
import { CourseItemDetailsComponent } from './shared/components/course-item-details/course-item-details.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NewCourseComponent } from './pages/courses/new-course/new-course.component';


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
            path: 'edit', component: CourseItemDetailsComponent,
            data: {
              breadcrumb: 'Edit'
            }
          },
          {
            path: 'detail', component: CourseItemDetailsComponent,
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
    component: LoginComponent
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
