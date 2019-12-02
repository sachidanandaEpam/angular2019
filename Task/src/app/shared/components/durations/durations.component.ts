import { Component, Input } from '@angular/core';
import { FormFieldItem } from 'src/app/models/form-field-item';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-durations',
  templateUrl: './durations.component.html',
  styleUrls: ['./durations.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DurationsComponent,
      multi: true
    }
  ]
})
export class DurationsComponent {
  get value(): string {
    return this._value;
  }

  set value(value: string) {
    this._value = value;
    this._onTouched();
    this._onChange(value);
  }

  @Input() formFieldItem: FormFieldItem;

  disabled = false;
  private _value: string;
  private _onChange: (value: any) => void = () => { };
  private _onTouched = () => { };

  writeValue(value: string): void {
    this._value = value;
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
