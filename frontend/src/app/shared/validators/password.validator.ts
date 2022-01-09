import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordValidator(password?: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let passwordsMatch: boolean;
    if (control instanceof FormControl) {
      let password2 = control.value;
      passwordsMatch = password == password2;
    } else if (control instanceof FormGroup) {
      passwordsMatch = Object.keys(control.controls).every((key, i, keys) => control.get(key).value === control.get(keys[0]).value);
    } else {
      // FormArray
      return null;
    }
    return passwordsMatch ? null : {mismatch: true};
  };
}

export function passwordPatternValidator(control: AbstractControl): ValidationErrors | null {
  let password = control.value;
  let errors: ValidationErrors = {};
  if (password) {
    if (password.length < 8) errors['length'] = true;
    if (!/[a-z]/.test(password)) errors['lowerCase'] = true;
    if (!/[A-Z]/.test(password)) errors['upperCase'] = true;
    if (!/[0-9]/.test(password)) errors['number'] = true;
    if (/[^a-zA-Z0-9!@#$%&_=+?~-]/g.test(password)) errors['illegalChars'] = true;
  }
  return Object.keys(errors).length === 0 ? null : errors;
}
