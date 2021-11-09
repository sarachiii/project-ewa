import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountForm: FormGroup;
  copyUser = {
    firstName: 'Sjors',
    lastName: 'Peters',
    profilePicture: 'https://yt3.ggpht.com/fAfB4LQvATPHhF9ou35zv5FZmXVhMtGnW_vZQNpyd_Krkzasu48k53I3UTIxcqNyMioqK4PR0w=s900-c-k-c0x00ffffff-no-rj',
    emailAddress: 'sjors.peters@climatecleanup.org'
  }

  constructor() {
    this.accountForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      profilePicture: new FormControl(''),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormGroup({
        currentOrNewPassword: new FormControl(''),
        repeatPassword: new FormControl('')
      })
    });
  }

  get firstName() {
    return this.accountForm.get('firstName');
  }

  get lastName() {
    return this.accountForm.get('lastName');
  }

  get emailAddress() {
    return this.accountForm.get('emailAddress');

  }

  ngOnInit(): void {
    // get logged in user
    this.accountForm.patchValue(this.copyUser)
    console.log(this.accountForm.get('firstName').valid);

  }

  onCancel() {
    this.accountForm.patchValue(this.copyUser);
  }

  onSubmit() {
    console.log(this.accountForm.value)
    console.log(this.accountForm.dirty)
  }
}
