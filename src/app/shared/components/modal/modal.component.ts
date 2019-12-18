import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { ModalService } from 'src/app/core/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() public modalId: string;
  @Input() public autostart = false;
  @Input() public dismissable = true;
  @Input() public escapable = true;

  @Input() public closed = new EventEmitter();
  @Input() public dismissed = new EventEmitter();

  constructor(private modal: ModalService) { }

  public ngOnInit() { }

  public open() {
    this.modal.open(this.modalId);
  }

  public close() {
    this.modal.close(this.modalId);
  }
}
