import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { DEFAULT_ERRORS, DEFAULT_PARAM_ERRORS, DEFAULT_PATTERN_ERROR, UNKNOWN_ERROR } from './errors';

@Pipe({
  name: 'controlErrors'
})
export class ControlErrorsPipe implements PipeTransform {

  transform(errors: ValidationErrors | null, patternError?: string): string[] {
    if (!errors) {
      return [];
    }

    return Object
      .entries(errors)
      .map(([err, value]) => {
        if (typeof value === 'string') {
          return value.charAt(0).toUpperCase() + value.slice(1);
        }

        if (err === 'pattern') {
          return patternError || DEFAULT_PATTERN_ERROR;
        }

        if (typeof DEFAULT_ERRORS[err] !== 'undefined') {
          return DEFAULT_ERRORS[err];
        }

        if (typeof DEFAULT_PARAM_ERRORS[err] !== 'undefined') {
          return DEFAULT_PARAM_ERRORS[err](value);
        }

        return `${UNKNOWN_ERROR}: ${err}:${value}`;
      });
  }

}
