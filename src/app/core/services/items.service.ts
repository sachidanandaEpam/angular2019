import { Injectable } from '@angular/core';
import { CourseItem } from 'src/app/core/models/course-item.model';
import { ServiceResponse } from 'src/app/core/models/service-response.model';
import { ApiService, EndPoint } from '../http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Courses } from '../models/courses.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  defaultSuccessResponse = {
    status: 'success',
    statusCode: 200
  };

  constructor(private _api: ApiService) { }

  get(start: number = 0, count: number = 1, textFragment: string = ''): Observable<CourseItem[]> {
    return this._api.get<Courses[]>(EndPoint.courses, {start, count, textFragment}).pipe(
      map(response => response.map(course => this.mapCourseItem(course)))
    );
  }

  getById(id: number = 0): Observable<CourseItem> {
    return this._api.get<Courses>(`${EndPoint.courses}/${id}`).pipe(
      map(course => this.mapCourseItem(course))
    );
  }

  create(item: CourseItem): Observable<CourseItem> {
    return this._api.post<Courses>(`${EndPoint.courses}`, this.mapCourses(item)).pipe(
      map(course => this.mapCourseItem(course))
    );
  }

  update(inputItem: CourseItem): Observable<CourseItem> {
    const course = this.mapCourses(inputItem);
    course.id = inputItem.id;
    return this._api.patch<Courses>(`${EndPoint.courses}/${inputItem.id}`, course).pipe(
      map(result => this.mapCourseItem(result))
    );
  }

  delete(inputItem: CourseItem): Observable<any> {
    return this._api.delete<CourseItem>(`${EndPoint.courses}/${inputItem.id}`);
  }

  private mapCourseItem(course: Courses): CourseItem {
    return {
      id: course.id,
      title: course.name,
      durationInMins: course.length,
      description: course.description,
      courseTime: Date.parse(course.date),
      creationTime: Date.parse(course.date),
      authors: course.authors,
      isTopRated: course.isTopRated
    };
  }

  private mapCourses(item: CourseItem): Courses {
    return {
      name: item.title,
      length: item.durationInMins,
      description: item.description,
      date: (new Date(item.courseTime)).toString(),
      authors: item.authors,
      isTopRated: item.isTopRated
    };
  }
}
