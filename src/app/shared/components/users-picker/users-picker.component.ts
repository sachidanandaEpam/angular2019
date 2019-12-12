import { Component, Input } from '@angular/core';
import { FormFieldItem } from 'src/app/core/models/form-field-item.model';
import { NG_VALUE_ACCESSOR, SelectMultipleControlValueAccessor } from '@angular/forms';
import { Author } from 'src/app/core/models';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users-picker',
  templateUrl: './users-picker.component.html',
  styleUrls: ['./users-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UsersPickerComponent,
      multi: true
    }
  ]
})
export class UsersPickerComponent {

  private allAuthors: Author[];

  constructor(private _user: UserService) {
    this._user.getAllAuthors().subscribe(
      result => this.allAuthors = result
    );
  }

  get value(): Author[] {
    return this._value;
  }

  set value(value: Author[]) {
    this._value = value;
    this._onTouched();
    this._onChange(value);
  }

  @Input() public formFieldItem: FormFieldItem;

  private disabled = false;
  private _value: Author[];
  private _onChange: (value: any) => void = () => { };
  private _onTouched = () => { };

  public writeValue(value: Author[]): void {
    this._value = value;
  }
  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public changeUsers(e) {
    console.log(e);
  }
}
