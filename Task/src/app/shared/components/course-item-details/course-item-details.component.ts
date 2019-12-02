import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/core/services/items.service';
import { CourseItem } from 'src/app/models/course-item';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormFieldItem } from 'src/app/models/form-field-item';
import { read } from 'fs';

@Component({
  selector: 'app-course-item-details',
  templateUrl: './course-item-details.component.html',
  styleUrls: ['./course-item-details.component.scss']
})
export class CourseItemDetailsComponent implements OnInit {
  private _isReadOnly: boolean;

  get readOnly(): boolean {
    return this._isReadOnly;
  }

  set readOnly(readOnly: boolean) {
    this._isReadOnly = readOnly;
  }
  private actionStatus: string;
  private item: CourseItem;
  itemDetailsForm: FormGroup;
  itemDetailFields: FormFieldItem[];

  constructor(private route: ActivatedRoute, private itemsService: ItemsService,
              private formBuilder: FormBuilder, private router: Router) {
    this.isReadOnly();

    this.itemDetailFields = [{
      cssClass: 'form-field',
      label: 'Title',
      optional: false,
      name: 'title',
      hint: 'Enter course title',
      type: 'text',
      readonly: this.readOnly
    },
    {
      cssClass: 'form-field',
      label: 'Description',
      optional: false,
      name: 'description',
      hint: 'Enter course description',
      type: 'textarea',
      readonly: this.readOnly
    },
    {
      cssClass: 'form-field form-field-quarter',
      label: 'Date',
      optional: false,
      name: 'courseTime',
      hint: 'Select date',
      type: 'text',
      readonly: this.readOnly
    },
    {
      cssClass: 'form-field form-field-quarter',
      label: 'Durations',
      optional: false,
      name: 'durationInMins',
      hint: 'Enter durations in minutes',
      type: 'text',
      readonly: this.readOnly
    },
    {
      cssClass: 'form-field form-field-half',
      label: 'Authors',
      optional: false,
      name: 'authors',
      hint: 'Select authors',
      type: 'text',
      readonly: this.readOnly
    }];

  }

  ngOnInit() {
    this.itemDetailsForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.email]],
      durationInMins: [null, [Validators.required, Validators.minLength(6)]],
      description: [null, [Validators.required]],
      courseTime: [null, [Validators.required]],
      authors: [null, [Validators.required]],
    });
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.item = this.itemsService.getById(id);

    if (this.item) {
      this.itemDetailsForm.patchValue(this.item);
    }
  }

  onSubmit() {
    if (this.itemDetailsForm.valid) {
      this.actionStatus = 'success';
    }
  }

  addCourse() {
    const response = this.itemsService.create({
      title: `Typescript Introduction`,
      description: `Learn about where you can find course descriptions`,
      durationInMins: 300,
      courseTime: Date.parse('01/29/2020 12:00'),
      creationTime: Date.parse('11/15/2019 9:00'),
      isTopRated: false
    });
    this.actionStatus = `Added ${response.status}`;
  }

  update(inputItem: CourseItem) {
    const response = this.itemsService.update(inputItem);
    if (response.statusCode < 400) {
      this.actionStatus = `Edited ${inputItem.title}`;
    } else {
      this.actionStatus = `${inputItem.title} not found. No action taken`;
    }
  }

  isReadOnly() {
    let isReadOnly = false;
    if (this.route.snapshot.data.breadcrumb === 'Detail') {
      isReadOnly = true;
    }
    this.readOnly = isReadOnly;
  }
}
