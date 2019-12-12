import { ServiceResponse } from './service-response.model';

export class AuthResponse implements ServiceResponse {
    public status: string;
    public statusCode: number;
    public userToken: any;
}
