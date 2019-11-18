import { Inject, Injectable } from '@angular/core';
import { AuthResponse } from 'src/app/entities/auth-response';
import { ServiceResponse } from 'src/app/entities/service-response';
import { User } from 'src/app/entities/user';
import { v4 as uuid } from 'uuid';
import { AppStorageService } from './app-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  adminUser = {
    id: 1,
    firstName: 'Admin',
    lastName: 'User',
    token: uuid()
  };

  loginUserKey = 'LoggedInUserId';

  constructor(private storageService: AppStorageService) { }

  public login(userName: string, password: string): AuthResponse {
    const response = new AuthResponse();
    let user: User = null;
    if (userName === 'admin@epam.com' && password === 'password') {
      user = this.adminUser;
    }
    if (!user) {
      response.status = 'Login Failed';
      response.statusCode = 401;
    } else {
      response.status = 'Successful';
      response.statusCode = 200;
      response.userToken = user.token;

      this.storageService.set(`${this.loginUserKey}`, user);
    }
    console.log(response);
    return response;
  }

  public logout(): ServiceResponse {
    this.storageService.remove(`${this.loginUserKey}`);
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
    return this.storageService.get(`${this.loginUserKey}`);
  }
}
