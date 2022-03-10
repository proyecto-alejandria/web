import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    }
  ],
})
export class FormFieldComponent implements ErrorStateMatcher, OnInit {

  @Input()
  name!: string;

  @Input()
  type: string = 'text';

  @Input()
  label!: string;

  @Input()
  fieldId?: string;

  @Input()
  required: boolean = true;

  @Input()
  placeholder?: string;

  @Input()
  autocomplete?: string;

  @Input('patternError')
  optPatternError?: string;

  form!: FormGroup;

  control!: FormControl;

  constructor(
    private controlContainer: ControlContainer
  ) { }

  ngOnInit(): void {
    this.form = (this.controlContainer as FormGroupDirective).form;
    this.control = <FormControl>this.form.get(this.name);
  }

  isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!((form?.dirty || form?.touched) && control?.invalid);
  }

  get inputId(): string {
    return this.fieldId || `field-${this.name}`;
  }

  get patternError(): string {
    return this.optPatternError || `Debe ser un ${this.label.toLowerCase()} válido`;
  }

}
