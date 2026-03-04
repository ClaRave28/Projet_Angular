import {Component, inject, signal, WritableSignal} from '@angular/core';
import {UserService} from '../services/user-service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {User} from '../models/User';

@Component({
  selector: 'app-user-profile',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {

  protected isConnect: WritableSignal<boolean> = signal(false);
  protected readonly userService = inject(UserService);
  protected user : User | null = null;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.user = this.userService.getCurrentUser()
    if (this.user){
      this.isConnect.set(true);
    }
  }


  async submit() {
    if (this.loginForm.invalid) return;

    const email = this.loginForm.value.email;

    try {
      this.user = await this.userService.getUserByEmail(email)
      this.userService.setCurrentUser(this.user);
      this.isConnect.set(true)
      this.toastr.success(`Bienvenue ${this.user.firstName} !`);
    }catch(err) {
      this.toastr.error('Utilisateur non trouvé');
    }
  }

  deconect() {
    this.userService.logout();
    this.toastr.success('Déconnecté');
    this.isConnect.set(false)
  }

}
