import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/core/services/items.service';
import { CourseItem } from 'src/app/core/models/course-item.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormFieldItem } from 'src/app/core/models/form-field-item.model';

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
  private itemDetailsForm: FormGroup;
  private itemDetailFields: FormFieldItem[];

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
      type: 'select',
      readonly: this.readOnly
    }];

  }

  public ngOnInit() {
    this.itemDetailsForm = this.formBuilder.group({
      id: [],
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.itemsService.getById(Number(id)).subscribe(
        result => {
          this.itemDetailsForm.patchValue(result);
        }
      );
    }
  }

  public onSubmit() {
    if (this.itemDetailsForm.valid) {
      this.actionStatus = 'success';
      this.itemsService.update(this.itemDetailsForm.value).subscribe();
    }
  }

  public isReadOnly() {
    let isReadOnly = false;
    if (this.route.snapshot.data.breadcrumb === 'Detail') {
      isReadOnly = true;
    }
    this.readOnly = isReadOnly;
  }
}
