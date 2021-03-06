import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { SessionService } from './session.service';

const allowedUser = {
  id: 1,
  firstName: 'Admin',
  lastName: 'User'
};

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        SessionService
      ]
    });
    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and return response', () => {
    let response = service.login('admin@epam.com', 'password');
    expect(response.userToken).toBeDefined();
    expect(response.statusCode).toEqual(200);

    response = service.login('admin@epam', 'password');
    expect(response.userToken).toBeFalsy();
    expect(response.statusCode).toEqual(401);
  });

  it('should logout and return response', () => {
    const response = service.logout();
    expect(response.statusCode).toEqual(200);
  });

  it('should return user', () => {
    let user = service.getUserInfo();
    expect(user).toBeFalsy();

    service.login('admin@epam.com', 'password');
    user = service.getUserInfo();
    expect(user).toBeTruthy();
    expect(user.firstName).toEqual(allowedUser.firstName);
  });

  it('should check isAuthenticated user', () => {
    expect(service.isAuthenticated()).toEqual(false);

    service.login('admin@epam.com', 'password');
    expect(service.isAuthenticated()).toEqual(true);
  });
});
