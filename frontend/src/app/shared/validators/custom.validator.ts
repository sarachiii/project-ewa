import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export function isInList(list: any[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let includes: boolean;
    if (control instanceof FormControl) {
      includes = list.includes(control.value);
    } else if (control instanceof FormGroup) {
      includes = Object.keys(control.controls).every((key) => list.includes(control.get(key).value));
    } else {
      // FormArray
      return null;
    }
    return includes ? null : { excludes: true };
  };
}
