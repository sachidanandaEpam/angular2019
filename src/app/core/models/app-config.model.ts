import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
    urls: {
        apiProtocol?: string,
        apiHost?: string,
        apiPort?: string,
        apiContext?: string
    }
}