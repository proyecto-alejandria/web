import { AbstractControl, ValidatorFn } from '@angular/forms';

export function fieldsMatchValidator(name1: string, name2: string): ValidatorFn {
  return (control: AbstractControl) => {
    const field1 = control.get(name1);
    const field2 = control.get(name2);

    if (field1 && field2 && field1.value !== field2.value) {
      field2.setErrors({
        match: 'Los valores no coinciden',
      });
    }

    return null;
  };
}
