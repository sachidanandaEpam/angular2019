import { Injectable } from '@angular/core';
import { User } from 'src/app/entities/user';
import { ServiceResponse } from 'src/app/entities/service-response';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  login(user: User): ServiceResponse {
    return null;
  }

  logout(): ServiceResponse {
    return null;
  }

  isAuthenticated(): boolean {
    return false;
  }

  getUserInfo(): User {
    return null;
  }
}
