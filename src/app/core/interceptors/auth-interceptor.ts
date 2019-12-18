import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';
import { EndPoint } from '../http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private readonly excludedEndpoints: EndPoint[] = [
        EndPoint.login,
        EndPoint.users
    ];

    constructor(private _session: SessionService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.ignoreRequests(req)) {
            req = req.clone({
                setHeaders: {
                    Authorization: this._session.getAccessToken()
                }
            });
        }
        return next.handle(req);
    }

    private ignoreRequests(req: HttpRequest<any>): boolean {
        return !this.excludedEndpoints.some(excluded => req.url.endsWith(excluded));
    }
}
