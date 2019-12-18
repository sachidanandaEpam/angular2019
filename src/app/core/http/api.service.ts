import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, MonoTypeOperatorFunction, of, throwError, Subject } from 'rxjs';
import { delay, tap, catchError } from 'rxjs/operators';
import { AppConfig } from '../models';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
  withCredentials: true
};

const delayInSec = 100;

export enum EndPoint {
  login = 'auth/login',
  users = 'users',
  userinfo = 'auth/userinfo',
  courses = 'courses',
  authors = 'authors'
}

@Injectable()
export class ApiService {
  private _requested = new Subject<string>();
  private _success = new Subject<string>();
  private _fail = new Subject<string>();

  constructor(private _httpClient: HttpClient, private _location: Location,
              private _config: AppConfig) { }

  public get<T>(endpoint: string | EndPoint, params?: HttpParams | {[param: string]: any}): Observable<T> {
    return this.getUrl<T>(this.getBaseUrl() + endpoint, params);
  }

  public post<T>(endpoint: string | EndPoint, body: any): Observable<T> {
    return this.postUrl(this.getBaseUrl() + endpoint, body);
  }

  public delete<T>(endpoint: string | EndPoint): Observable<T> {
    return this.deleteUrl(this.getBaseUrl() + endpoint);
  }

  public patch<T>(endpoint: string | EndPoint, body: any): Observable<T> {
    return this.patchUrl(this.getBaseUrl() + endpoint, body);
  }

  public getUrl<T>(url: string, params?: HttpParams | {[param: string]: any}): Observable<T> {
    this._requested.next(url);
    return this._httpClient.get<T>(url, { params, withCredentials: true})
    .pipe(
      delay(delayInSec),
      tap(() => this._success.next(url)),
      catchError(this.handleError.bind(this))
    );
  }

  public postUrl<T>(url: string, body: any): Observable<T> {
    this._requested.next(url);
    return this._httpClient.post<T>(url, body, httpOptions)
    .pipe(
      delay(delayInSec),
      tap(() => this._success.next(url)),
      catchError(this.handleError.bind(this))
    );
  }

  public deleteUrl<T>(url: string): Observable<T> {
    this._requested.next(url);
    return this._httpClient.delete<T>(url, httpOptions)
    .pipe(
      delay(delayInSec),
      tap(() => this._success.next(url)),
      catchError(this.handleError.bind(this))
    );
  }

  public patchUrl<T>(url: string, body: any): Observable<T> {
    this._requested.next(url);
    return this._httpClient.patch<T>(url, body, httpOptions)
    .pipe(
      delay(delayInSec),
      tap(() => this._success.next(url)),
      catchError(this.handleError.bind(this))
    );
  }

  public getBaseUrl(): string {
    const protocol = this._config.urls.apiProtocol;
    const hostname = this._config.urls.apiHost;
    const port = this.getApiPort();
    const context = this.getApiContext();

    return `${protocol}//${hostname}${port}/${context}`;
  }

  public catchFailure<T>(failureResult?: T): MonoTypeOperatorFunction<T> {
    return catchError(() => of(failureResult as T));
  }

  private getApiPort(): string {
    let port = this._config.urls.apiPort;
    if (port) {
      port = `:${port}`;
    }
    return port;
  }

  private getApiContext(): string {
    const context = this._location.normalize(this._config.urls.apiContext || '');
    return context ?  context + '/' : '';
  }

  private handleError(error: HttpErrorResponse) {
    this._fail.next(error.url);
    const errorMsg = error.message || (error.status && `${error.status} - ${error.statusText}`) || 'Server error';
    const errorCode = '' + error.status;
    return throwError({ message: errorMsg, errorCode, original: error});
  }
}
