import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../services/user-service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {User} from '../models/User';

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
  protected createdUser: User | undefined;


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
      const formValue = this.userForm.value;
      try {
        this.createdUser = await this.userService.addUser(formValue);
        this.userService.setCurrentUser(this.createdUser);
        this.toastr.success('Utilisateur ajouté avec succès !');
        this.router.navigate(['/profile']);
      } catch (addError) {
        try {
          this.createdUser = await this.userService.getUserByEmail(formValue.email);
          if (this.createdUser) {
            this.userService.setCurrentUser(this.createdUser);
            this.toastr.success('Utilisateur connecté !');
            this.router.navigate(['/profile']);
          } else {
            this.toastr.error('Utilisateur non trouvé');
          }
        } catch (getError) {
          this.toastr.error('Erreur lors de la récupération de l’utilisateur');
        }
      }}
  }
}
