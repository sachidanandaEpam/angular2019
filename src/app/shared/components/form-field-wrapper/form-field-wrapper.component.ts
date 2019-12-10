import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, ValidationErrors } from '@angular/forms';
import { FormFieldItem } from 'src/app/core/models/form-field-item.model';

@Component({
  selector: 'app-form-field-wrapper',
  templateUrl: './form-field-wrapper.component.html',
  styleUrls: ['./form-field-wrapper.component.scss']
})
export class FormFieldWrapperComponent {
  @Input() formItem: FormFieldItem;
  @Input() formGroup: FormGroup;

  hasErrors(): boolean {
    if (!this.formGroup || !this.formItem || !this.formItem.name) {
      return false;
    }
    const control = this.formGroup.get(this.formItem.name) as FormControl;
    return control && control.touched && control.invalid;
  }

  get errors(): ValidationErrors {
    if (this.hasErrors()) {
      const control = this.formGroup.get(this.formItem.name) as FormControl;
      return control.errors;
    }
  }
}
