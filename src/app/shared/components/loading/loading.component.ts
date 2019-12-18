import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingInfo, ProgressService } from 'src/app/core/services/progress.service';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/core/services/modal.service';
import { takeUntil, tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  public modalId = 'globalLoading';
  public loadingInfo: LoadingInfo;

  private _destroyed = new Subject();

  constructor(private _progress: ProgressService, private _modal: ModalService) { }

  public ngOnInit() {
    this._progress.onStart.pipe(
      takeUntil(this._destroyed),
      tap(info => this.loadingInfo = info)
    ).subscribe(() => {
      this._modal.open(this.modalId);
    });

    this._progress.onFinish.pipe(
      takeUntil(this._destroyed)
    ).subscribe(() => {
      this._modal.close(this.modalId);
    });
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
  }
}
