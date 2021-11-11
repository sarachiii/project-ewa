import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordValidator {
  static matches(control: AbstractControl, password?: string): ValidationErrors | null {
    let password2;
    if (password) {
      password2 = control.value;
    } else {
      try {
        password = control.get('password').value;
        password2 = control.get('confirmPassword').value;
      } catch (e) {
        console.log(e);
      }
    }
    return password == password2 ? null : { mismatch: true };
  }

  static pattern(control: AbstractControl): ValidationErrors | null {
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
}
