import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validation-error-display',
  templateUrl: './validation-error-display.component.html',
  styleUrls: ['./validation-error-display.component.scss']
})
export class ValidationErrorDisplayComponent {

  errorList: { error: string, data: any }[];

  @Input() set errors(value: ValidationErrors) {
    if (value) {
      this.errorList = Object.keys(value).map(error => ({ error, data: value[error] }));
    } else {
      this.errorList = [];
    }
  }
}
