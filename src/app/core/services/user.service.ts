import { Injectable } from '@angular/core';
import { ApiService, EndPoint } from '../http';
import { Observable } from 'rxjs';
import { User, Token, Author } from '../models';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _api: ApiService, private session: SessionService) { }

  public getUserInfo(): Observable<User> {
    const t = new Token();
    t.token = this.session.getAccessToken();
    return this._api.post<User>(EndPoint.userinfo, t);
  }

  public getAllAuthors(): Observable<Author[]> {
    return this._api.get<Author[]>(EndPoint.authors);
  }
}
