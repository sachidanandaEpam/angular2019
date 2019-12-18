import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { CourseItem } from 'src/app/core/models/course-item.model';
import { ApiService, EndPoint } from '../http';
import { Courses } from '../models/courses.model';
import { ProgressService } from './progress.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private _api: ApiService, private _progress: ProgressService) { }

  public get(start: number = 0, count: number = 1, textFragment: string = ''): Observable<CourseItem[]> {
    return this._progress.loadingWrapper(
      this._api.get<Courses[]>(EndPoint.courses, {start, count, textFragment}).pipe(
      map(response => response.map(course => this.mapCourseItem(course))),
    ), {message: 'Loading Items'});
  }

  public getById(id: number = 0): Observable<CourseItem> {
    return this._progress.loadingWrapper(this._api.get<Courses>(`${EndPoint.courses}/${id}`).pipe(
      map(course => this.mapCourseItem(course))
    ), {message: 'Getting item'});
  }

  public create(item: CourseItem): Observable<CourseItem> {
    return this._progress.loadingWrapper(this._api.post<Courses>(`${EndPoint.courses}`, this.mapCourses(item)).pipe(
      map(course => this.mapCourseItem(course))
    ), {message: 'Creating item'});
  }

  public update(inputItem: CourseItem): Observable<CourseItem> {
    const course = this.mapCourses(inputItem);
    course.id = inputItem.id;
    return this._progress.loadingWrapper(this._api.patch<Courses>(`${EndPoint.courses}/${inputItem.id}`, course).pipe(
      map(result => this.mapCourseItem(result))
    ), {message: 'Updating item'});
  }

  public delete(inputItem: CourseItem): Observable<void> {
    return this._progress.loadingWrapper(this._api.delete<void>(`${EndPoint.courses}/${inputItem.id}`),
      {message: 'Deleting items'});
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
