import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormFieldItem } from 'src/app/core/models';
import { ItemsService } from 'src/app/core/services/items.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss']
})
export class NewCourseComponent implements OnInit {

  itemDetailsForm: FormGroup;
  itemDetailFields: FormFieldItem[];

  constructor(private itemsService: ItemsService,
              private formBuilder: FormBuilder) {

    this.itemDetailFields = [{
      cssClass: 'form-field',
      label: 'Title',
      optional: false,
      name: 'title',
      hint: 'Enter course title',
      type: 'text'
    },
    {
      cssClass: 'form-field',
      label: 'Description',
      optional: false,
      name: 'description',
      hint: 'Enter course description',
      type: 'textarea'
    },
    {
      cssClass: 'form-field form-field-quarter',
      label: 'Date',
      optional: false,
      name: 'courseTime',
      hint: 'Select date',
      type: 'text'
    },
    {
      cssClass: 'form-field form-field-quarter',
      label: 'Durations',
      optional: false,
      name: 'durationInMins',
      hint: 'Enter durations in minutes',
      type: 'text'
    },
    {
      cssClass: 'form-field form-field-half',
      label: 'Authors',
      optional: false,
      name: 'authors',
      hint: 'Select authors',
      type: 'select'
    }];
  }

  ngOnInit() {
    this.itemDetailsForm = this.formBuilder.group({
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
  }

  onSubmit() {
    if (this.itemDetailsForm.valid) {
      const item = this.itemDetailsForm.value;
      this.itemsService.create(item).subscribe();
    }
  }
}
