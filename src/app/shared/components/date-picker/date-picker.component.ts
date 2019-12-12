import { Component, Input } from '@angular/core';
import { FormFieldItem } from 'src/app/core/models/form-field-item.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this._onTouched();
    this._onChange(value);
  }

  @Input() public formFieldItem: FormFieldItem;

  private disabled = false;
  private _value: string;
  private _onChange: (value: any) => void = () => { };
  private _onTouched = () => { };

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
}
