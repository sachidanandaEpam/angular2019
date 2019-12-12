import { Injectable, Inject } from '@angular/core';
import { SessionStrategy } from '../session-manager/strategy/session-strategy';
import { SessionContext } from '../session-manager/strategy/session-context';
import { APP_STORAGE_CONFIG } from '../session-manager/config/session-manager-token';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private session: SessionStrategy;
  private context: SessionContext;

  private readonly accessTokenKey = 'access_token';

  constructor(@Inject(APP_STORAGE_CONFIG) public config: any) {
    // TODO: Why the config structure changes prod to non-prod or w/o --aot
    if (config.config) {
      this.context = new SessionContext(config.config.strategyType);
    } else {
      this.context = new SessionContext(config.strategyType);
    }
  }

  private initSession() {
    if (!this.session) {
      this.session = this.context.loadStorage();
    }
  }

  private getSession() {
    this.initSession();
    return this.session;
  }

  public getAccessToken(): string {
    return this.getSession().get(this.accessTokenKey);
  }

  public setAccessToken(value: string): void {
    return this.getSession().set(this.accessTokenKey, value);
  }

  public removeAccessToken(): void {
    this.getSession().remove(this.accessTokenKey);
  }

  public get<T>(key: string): T {
    return JSON.parse(this.getSession().get(key)) as T;
  }

  public set<T>(key: string, value: T) {
    this.getSession().set(key, JSON.stringify(value));
  }

  public remove(key: string) {
    this.getSession().remove(key);
  }

  public clear() {
    this.getSession().removeAll();
  }
}
