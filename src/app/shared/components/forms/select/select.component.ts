import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements ControlValueAccessor {

  @Input() public items?: any[];
  @Input() public placeholder?: string;
  @Input() public multiple = true;
  @Input() public bindLabel?: string;
  @Input() public bindValue?: string;
  @Input() public clearable?: boolean;

  @ViewChild(NgSelectComponent, { static: true}) public select: NgSelectComponent;

  constructor() { }

  public writeValue(value: any): void {
    this.select.writeValue(value);
  }
  public registerOnChange(fn: any): void {
    this.select.registerOnChange(fn);
  }
  public registerOnTouched(fn: any): void {
    this.select.registerOnTouched(fn);
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.select.setDisabledState(isDisabled);
  }

  public close(): void {
    this.select.close();
  }
}
