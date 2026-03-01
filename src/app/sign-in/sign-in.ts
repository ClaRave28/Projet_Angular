import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../services/user-service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {

  userForm: FormGroup;


  private readonly userService= inject(UserService);

  constructor(protected readonly router : Router, private toastr: ToastrService,private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: 0,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
      points: 0
    });
  }

  async onSubmit() {
    if (this.userForm.valid) {
      try {
        const createdUser = await this.userService.addUser(this.userForm.value);
        console.log(createdUser);
        this.toastr.success('User successfully added!');
        this.router.navigate(['/']);

      } catch (err) {
        this.toastr.error("Sign in failed");
        console.error(err);
      }
    }
  }
}
