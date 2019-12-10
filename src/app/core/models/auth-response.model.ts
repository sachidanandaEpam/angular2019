import { ServiceResponse } from './service-response.model';

export class AuthResponse implements ServiceResponse {
    status: string; statusCode: number;
    userToken: any;
}
