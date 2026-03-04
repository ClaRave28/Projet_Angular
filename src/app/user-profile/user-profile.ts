import {Component, inject} from '@angular/core';
import {UserService} from '../services/user-service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss',
})
export class UserProfile {

  private readonly userService = inject(UserService);
  protected user = this.userService.getCurrentUser();
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  deconect(): void {
    this.userService.logout();
  }

  async submit() {
    if (this.loginForm.invalid) return;

    const email = this.loginForm.value.email;

    try {
      this.user = await this.userService.getUserByEmail(email)
      this.userService.setCurrentUser(this.user);
      this.toastr.success(`Bienvenue ${this.user.firstName} !`);
    }catch(err) {
      this.toastr.error('Utilisateur non trouvé');
    }
  }

}
