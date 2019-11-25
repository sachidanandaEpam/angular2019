import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/core/services/items.service';
import { CourseItem } from 'src/app/models/course-item';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-item-details',
  templateUrl: './course-item-details.component.html',
  styleUrls: ['./course-item-details.component.scss']
})
export class CourseItemDetailsComponent implements OnInit {

  private actionStatus: string;
  private item: CourseItem;
  itemDetailsForm: FormGroup;

  constructor(private itemsService: ItemsService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.itemDetailsForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.email]],
      durationInMins: [null, [Validators.required, Validators.minLength(6)]],
      description: [null, [Validators.required]],
      courseTime: [null, [Validators.required]],
      authors: [null, [Validators.required]],
    });
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
}
