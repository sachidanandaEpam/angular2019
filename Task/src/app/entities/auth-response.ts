import { ServiceResponse } from './service-response';

export class AuthResponse implements ServiceResponse {
    status: string; statusCode: number;
    userToken: any;
}
