import { Injectable, InjectionToken, Inject } from '@angular/core';
import { CoreModule } from '../core.module';

export const APP_STORAGE = new InjectionToken<Storage>('application storage', {
  providedIn: 'root',
  factory: () => sessionStorage,
});

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  constructor(@Inject(APP_STORAGE) public storage) { }

  get<T>(key: string): T {
    return JSON.parse(this.storage.getItem(key)) as T;
  }

  set<T>(key: string, value: T) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}
