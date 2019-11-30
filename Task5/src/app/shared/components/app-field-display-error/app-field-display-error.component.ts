import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-display-error',
  templateUrl: './app-field-display-error.component.html',
  styleUrls: ['./app-field-display-error.component.scss']
})
export class AppFieldDisplayErrorComponent {

  @Input() errorMsg: string;
  @Input() displayError: boolean;
}
