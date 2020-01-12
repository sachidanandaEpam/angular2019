import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { OwlDateTimeModule } from 'ng-pick-datetime/date-time';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { AppRoutingModule } from '../app-routing.module';
import { BlockLoadingComponent } from './components/block-loading/block-loading.component';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { DurationsComponent } from './components/durations/durations.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormFieldWrapperComponent } from './components/form-field-wrapper/form-field-wrapper.component';
import { SelectComponent } from './components/forms/select/select/select.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ModalComponent } from './components/modal/modal.component';
import { PageNotFoundComponent } from './components/page-not-found';
import { UsersPickerComponent } from './components/users-picker/users-picker.component';
import { ValidationErrorDisplayComponent } from './components/validation/validation-error-display.component';
import { FormatCourseItemDirective } from './directives/format-course-item.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { FilterItemsPipe } from './pipes/filter-items.pipe';
import { SortItemsPipe } from './pipes/sort-items.pipe';


const COMPONENTS = [
  BreadCrumbComponent,
  FooterComponent,
  HeaderComponent,
  PageNotFoundComponent,
  ValidationErrorDisplayComponent,
  DatePickerComponent,
  DurationsComponent,
  UsersPickerComponent,
  FormFieldWrapperComponent,
  ModalComponent,
  LoadingComponent,
  BlockLoadingComponent,
  SelectComponent
];

const PIPES = [
  FilterItemsPipe,
  SortItemsPipe,
  DurationPipe
];
const DIRECTIVES = [
  FormatCourseItemDirective
];

const ANGULARMODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  NgSelectModule,
  OwlDateTimeModule,
  OwlMomentDateTimeModule
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES
  ],
  imports: [
    NgxSmartModalModule,
    ...ANGULARMODULES
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
    ...ANGULARMODULES
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
