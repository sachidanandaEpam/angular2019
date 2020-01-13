import { Injectable } from '@angular/core';
import { FormFieldItem } from '../models';
import { FormGroup, FormControl, ValidatorFn, Validators, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  public buildFormGroup(items: FormFieldItem[]): FormGroup {
    const group: any = {};
    const initialValue = null;

    items.forEach(item => {
      group[item.name] = new FormControl(initialValue, this.buildFieldValidators(item));
    });

    return new FormGroup(group);
  }

  private buildFieldValidators(field: FormFieldItem): ValidatorFn[] {
    const validators = [];

    if (!field.optional) {
      validators.push(Validators.required);
    }

    if (field.type === 'input' || field.type === 'textarea') {
      validators.push(...this.buildInputFieldValidators(field));
    }

    return validators;
  }

  private buildInputFieldValidators(input: FormFieldItem): ValidatorFn[] {
    const validators = [];

    if (input.minLength) {
      validators.push(Validators.minLength(input.minLength));
    }

    if (input.maxLength) {
      validators.push(Validators.maxLength(input.maxLength));
    }

    if (input.inputType === 'number') {
      validators.push((control: AbstractControl): {[key: string]: any} | null => {
        const failed = control.value && !Number.isInteger(control.value);
        return failed ? { integer: { actual: control.value } } : null;
      });
    }

    if (input.inputType === 'email') {
      validators.push(Validators.email);
    }

    return validators;
  }
}
