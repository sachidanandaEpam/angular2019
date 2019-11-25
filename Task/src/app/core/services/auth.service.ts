import { Inject, Injectable } from '@angular/core';
import { AuthResponse } from 'src/app/models/auth-response';
import { ServiceResponse } from 'src/app/models/service-response';
import { User } from 'src/app/models/user';
import { v4 as uuid } from 'uuid';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private allowedUsers = [{
    id: 1,
    userName: 'admin@epam.com',
    password: 'password',
    firstName: 'Admin',
    lastName: 'User',
    token: uuid()
  }];

  loginUserKey = 'LoggedInUserId';

  constructor(private sessionService: SessionService) { }

  public login(inputUserName: string, inputPassword: string): AuthResponse {
    const response = new AuthResponse();

    const userMatch = this.allowedUsers.find(e => e.userName === inputUserName && e.password === inputPassword);
    if (userMatch !== undefined) {
      response.status = 'Successful';
      response.statusCode = 200;
      response.userToken = userMatch.token;
      this.sessionService.set(`${this.loginUserKey}`, userMatch);
    } else {
      response.status = 'Login Failed';
      response.statusCode = 401;
    }
    console.log(response);
    return response;
  }

  public logout(): ServiceResponse {
    this.sessionService.remove(`${this.loginUserKey}`);
    const response = {
      status: 'Successfully logged out',
      statusCode: 200
    };
    console.log(response);
    return response;
  }

  public isAuthenticated(): boolean {
    return this.getUserInfo() ? true : false;
  }

  public getUserInfo(): User {
    return this.sessionService.get(`${this.loginUserKey}`);
  }
}
