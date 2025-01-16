import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) {
      return null; // If the field is empty, no validation error
    }

    const regex = /^\d{4}\d{2}\d{2}$/;
    const valid = regex.test(value);

    return valid ? null : { invalidDate: { value: control.value } };
  };
}
