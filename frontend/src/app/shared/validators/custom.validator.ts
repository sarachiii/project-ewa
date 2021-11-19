import {AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors} from "@angular/forms";

export function requireOneDisableAll(group: AbstractControl): ValidationErrors | null {
  if (group instanceof FormControl || group instanceof FormArray) {
    throw new TypeError('requireOneDisableAll can only be used with FormGroups');
  }

  let controlKeys = Object.keys((<FormGroup>group).controls);

  // Find which control has a value (becomes truthy in .find())
  let control = controlKeys.find((key) => (<FormGroup>group).get(key).value);

  controlKeys.forEach(key => {
    if (control) {
      // Disable all controls that are not the control with value
      if (key !== control) (<FormGroup>group).get(key).disable({ onlySelf: true });
    } else {
      // Enable all controls
      (<FormGroup>group).get(key).enable({ onlySelf: true });
    }
  });

  return null;
}

// TODO: Slightly different from Validators.required, but why?
export function requiredNonEmpty(control: AbstractControl): ValidationErrors | null {
  let nonEmpty: boolean;
  if (control instanceof FormControl) {
    nonEmpty = !!control.value;
  } else if (control instanceof FormGroup) {
    nonEmpty = Object.keys(control.controls).every((key) => control.get(key).value);
  } else { // FormArray
    return null;
  }
  return nonEmpty ? null : { empty: true }
}
