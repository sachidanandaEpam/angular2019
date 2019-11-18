import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found';
import { FormatCourseItemDirective } from './directives/format-course-item.directive';
import { DurationPipe } from './pipes/duration.pipe';
import { FilterItemsPipe } from './pipes/filter-items.pipe';
import { SortItemsPipe } from './pipes/sort-items.pipe';
import { AppFieldDisplayErrorComponent } from './components/app-field-display-error/app-field-display-error.component';


const COMPONENTS = [
  BreadCrumbComponent,
  FooterComponent,
  HeaderComponent,
  PageNotFoundComponent,
  AppFieldDisplayErrorComponent
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
  AppRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  CommonModule
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    ...DIRECTIVES
  ],
  imports: [
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
