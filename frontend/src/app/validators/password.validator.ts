import { AbstractControl, FormControl, FormGroup, ValidationErrors } from "@angular/forms";

export class PasswordValidator {
  static password: any = null;

  static newGroup(control: AbstractControl): ValidationErrors | null {
    let password = control.get('password').value;
    let confirmPassword = control.get('confirmPassword').value;
    // For some reason FormGroup.reset() sets it to null
    // if (!password) password = null;
    // if (!confirmPassword) confirmPassword = null;
    // console.log(password, confirmPassword)
    return password == confirmPassword ? null : { misMatch: true };
  }

  static current(control: AbstractControl): ValidationErrors | null {
    return control.value == PasswordValidator.password ? null : { misMatch: true };
  }

  static pattern(control: AbstractControl): ValidationErrors | null {
    let password = control.value;
    let errors: ValidationErrors = {};
    if (password) {
      if (password.length < 8) {
        errors['length'] = true;
      }
      if (!/[a-z]/.test(password)) {
        errors['lowerCase'] = true;
      }
      if (!/[A-Z]/.test(password)) {
        errors['upperCase'] = true;
      }
      if (!/[0-9]/.test(password)) {
        errors['number'] = true;
      }
      if (/[^a-zA-Z0-9!@#$%&_=+?~-]/g.test(password)) {
        errors['illegalChars'] = true;
      }
    }
    // console.log(errors)
    return Object.keys(errors).length === 0 ? null : errors;
  }

  static with(password: any) {
    PasswordValidator.password = password;
    return this;
  }
}
