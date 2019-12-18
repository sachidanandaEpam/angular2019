import { Injectable } from '@angular/core';
import { Subject, Observable, of, throwError, EMPTY } from 'rxjs';
import { switchMapTo, tap, catchError } from 'rxjs/operators';

export interface LoadingInfo {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  public onStart = new Subject<LoadingInfo>();
  public onFinish = new Subject<void>();

  private start(info?: LoadingInfo): void {
    this.onStart.next(info);
  }

  private finish(): void {
    this.onFinish.next();
  }

  public loadingWrapper<T>(originalObservable: Observable<T>, info?: LoadingInfo): Observable<T> {
    return of(EMPTY).pipe(
      tap(() => this.start(info)),
      switchMapTo(originalObservable),
      tap(() => this.finish()),
      catchError(error => {
        this.finish();
        return throwError(error);
      })
    );
  }
}
