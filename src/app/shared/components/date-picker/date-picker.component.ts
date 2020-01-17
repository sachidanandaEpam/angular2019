import { Component, Input, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { FormFieldItem } from 'src/app/core/models/form-field-item.model';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DatePickerComponent,
      multi: true
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor {
  @HostBinding('class.input-group')
  public group = true;

  @Input() public formFieldItem: FormFieldItem;

  public defaultPicker = moment.localeData().longDateFormat('L');

  public disabled = false;
  private _value: string;
  public _onChange: (value: any) => void = () => { };
  public _onTouched = () => { };

  public get value(): string {
    return this._value;
  }

  public set value(value: string) {
    this._value = value;
    this._onTouched();
    this._onChange(value);
  }

  public writeValue(value: string): void {
    this._value = value;
  }
  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public handleBlur() {
    this._onTouched();
  }
}
