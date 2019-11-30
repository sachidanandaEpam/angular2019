import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class AppFieldDisplayErrorComponent {

  @Input() errorMsg: string;
  @Input() displayError: boolean;
}
