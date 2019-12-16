import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
    public urls: {
        apiProtocol?: string,
        apiHost?: string,
        apiPort?: string,
        apiContext?: string
    };
    public defaultCourseToDisplay?: number;
}
