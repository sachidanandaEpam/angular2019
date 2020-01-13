import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { CourseItem, Author } from 'src/app/core/models';
import { FormFieldItem } from 'src/app/core/models/form-field-item.model';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ValidationService } from '@app/core/services/validation.service';

@Component({
  selector: 'app-course-item-details',
  templateUrl: './course-item-details.component.html',
  styleUrls: ['./course-item-details.component.scss']
})
export class CourseItemDetailsComponent implements OnInit {
  @Input() public isReadOnly: boolean;
  @Input() public item: CourseItem;
  @Output() public itemSubmit = new EventEmitter<CourseItem>();

  private actionStatus: string;
  public itemDetailsForm: FormGroup;
  public itemDetailFields: FormFieldItem[];

  constructor(private validation: ValidationService) {
    this.itemDetailFields = [{
      cssClass: 'form-field',
      label: 'Title',
      optional: false,
      name: 'title',
      hint: 'Enter course title',
      type: 'input',
      readonly: this.isReadOnly,
      inputType: 'text',
      maxLength: 50
    },
    {
      cssClass: 'form-field',
      label: 'Description',
      optional: false,
      name: 'description',
      hint: 'Enter course description',
      type: 'textarea',
      readonly: this.isReadOnly,
      maxLength: 500
    },
    {
      cssClass: 'form-field form-field-quarter',
      label: 'Date',
      optional: false,
      name: 'courseTime',
      hint: 'Select course date',
      type: 'input',
      readonly: this.isReadOnly,
      inputType: 'text'
    },
    {
      cssClass: 'form-field form-field-quarter',
      label: 'Durations (mins)',
      optional: false,
      name: 'durationInMins',
      hint: 'Enter durations in minutes',
      type: 'input',
      readonly: this.isReadOnly,
      inputType: 'number'
    },
    {
      cssClass: 'form-field form-field-half',
      label: 'Authors',
      optional: false,
      name: 'authors',
      hint: 'Select authors',
      type: 'select',
      readonly: this.isReadOnly
    },
    {
      optional: false,
      name: 'id',
      type: 'input',
      readonly: this.isReadOnly,
      inputType: 'hidden'
    }];

  }

  public ngOnInit() {
    this.itemDetailsForm = this.validation.buildFormGroup(this.itemDetailFields);

    this.itemDetailsForm.patchValue(this.item);
  }

  public onSubmit() {
    if (this.itemDetailsForm.valid) {
      this.actionStatus = 'success';
      this.itemSubmit.emit(this.itemDetailsForm.value);
    }
  }
}
