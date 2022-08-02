import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DataViewModule } from 'primeng/dataview';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ToolbarModule } from 'primeng/toolbar';
import { InputMaskModule } from 'primeng/inputmask';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CalendarModule } from 'primeng/calendar';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccordionModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    CardModule,
    RadioButtonModule,
    InputTextModule,
    PasswordModule,
    DataViewModule,
    AutoCompleteModule,
    InputTextareaModule,
    SlideMenuModule,
    ToolbarModule,
    InputMaskModule,
    ToggleButtonModule,
    CalendarModule,
    BreadcrumbModule
  ],
  exports: [
    AccordionModule,
    TableModule,
    TooltipModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    CardModule,
    RadioButtonModule,
    InputTextModule,
    PasswordModule,
    DataViewModule,
    AutoCompleteModule,
    InputTextareaModule,
    SlideMenuModule,
    ToolbarModule,
    InputMaskModule,
    ToggleButtonModule,
    CalendarModule,
    BreadcrumbModule
  ]
})
export class PrimeNgModule { }
