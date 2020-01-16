import { Component, forwardRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Author, FormFieldItem } from '@app/core/models';
import { UserService } from '@app/core/services/user.service';
import { SelectComponent } from '../forms/select/select.component';
import { Observable } from 'rxjs';

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
export class UsersPickerComponent implements ControlValueAccessor, OnInit {

  @Input() public formFieldItem: FormFieldItem;

  @Output() public selected = new EventEmitter<Author[]>();

  @ViewChild(SelectComponent, { static: true}) public select: SelectComponent;

  public allAuthors$: Observable<Author[]>;

  private _selctedAuthors: Author[];
  private _onChange: (value: Author[]) => void = () => {};
  private _onTouched = () => {};

  public get selctedAuthors(): Author[] {
    return this._selctedAuthors;
  }

  public set selctedAuthors(value: Author[]) {
    this._selctedAuthors = value;
    this.selected.emit(value);
    this._onChange(this._selctedAuthors);
    this._onTouched();
  }

  constructor(private _user: UserService) { }

  public writeValue(value: Author[]): void {
    this._selctedAuthors = value;
  }
  public registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.formFieldItem.readonly = isDisabled;
  }

  public ngOnInit() {
    this.allAuthors$ = this._user.getAllAuthors();
  }
}
