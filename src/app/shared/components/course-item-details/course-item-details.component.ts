import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseItem } from 'src/app/core/models';
import { FormFieldItem } from 'src/app/core/models/form-field-item.model';

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


  constructor(private formBuilder: FormBuilder) {
    this.itemDetailFields = [{
      cssClass: 'form-field',
      label: 'Title',
      optional: false,
      name: 'title',
      hint: 'Enter course title',
      type: 'text',
      readonly: this.isReadOnly
    },
    {
      cssClass: 'form-field',
      label: 'Description',
      optional: false,
      name: 'description',
      hint: 'Enter course description',
      type: 'textarea',
      readonly: this.isReadOnly
    },
    {
      cssClass: 'form-field form-field-quarter',
      label: 'Date',
      optional: false,
      name: 'courseTime',
      hint: 'Select date',
      type: 'text',
      readonly: this.isReadOnly
    },
    {
      cssClass: 'form-field form-field-quarter',
      label: 'Durations',
      optional: false,
      name: 'durationInMins',
      hint: 'Enter durations in minutes',
      type: 'text',
      readonly: this.isReadOnly
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
      type: 'hidden',
      readonly: this.isReadOnly
    }];

  }

  public ngOnInit() {
    this.itemDetailsForm = this.formBuilder.group({
      id: [null],
      title: [null, [Validators.required]],
      durationInMins: [null, [Validators.required]],
      description: [null, [Validators.required]],
      courseTime: [null, [Validators.required]],
      authors: this.formBuilder.array([
        this.formBuilder.group({
          id: [null, [Validators.required]],
          name: [null, [Validators.required]]
        })
      ])
    });

    this.itemDetailsForm.patchValue(this.item);
  }

  public onSubmit() {
    if (this.itemDetailsForm.valid) {
      this.actionStatus = 'success';
      this.itemSubmit.emit(this.itemDetailsForm.value);
    }
  }
}
