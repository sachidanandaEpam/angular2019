import { Injectable } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subject, Observable } from 'rxjs';

export interface ConfirmationRequest {
  message: string;
  description?: string;
  cancelButton?: string;
  confirmButton?: string;
  noCancel?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

export interface FailureRequest {
  message: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public needConfirmation = new Subject<ConfirmationRequest>();
  public failed = new Subject<FailureRequest>();

  constructor(private _modal: NgxSmartModalService) { }

  public open(modalId: string) {
    this._modal.open(modalId);
  }

  public close(modalId: string) {
    this._modal.close(modalId);
  }

  public confirm(message: string, description?: string, confirmButton?: string, cancelButton?: string): Observable<boolean> {
    const resultSubject = new Subject<boolean>();

    this.needConfirmation.next({
      message,
      description,
      confirmButton,
      cancelButton,
      onConfirm: () => {
        resultSubject.next(true);
      },
      onCancel: () => {
        resultSubject.next(false);
      }
    });
    return resultSubject.asObservable();
  }

  public alert(message: string, description?: string, confirmButton?: string): Observable<boolean> {
    const resultSubject = new Subject<boolean>();

    this.needConfirmation.next({
      message,
      description,
      confirmButton,
      onConfirm: () => {
        resultSubject.next(true);
      },
      onCancel: () => {
        resultSubject.next(false);
      }
    });
    return resultSubject.asObservable();
  }

  public failure(message: string, description?: string): void {
    this.failed.next({message});
  }
}
