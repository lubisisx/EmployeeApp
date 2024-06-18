import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  role: string = '';
  gender: string = '';
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  register() {
    this.authService
      .register({
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.role,
        gender: this.gender,
        username: this.username,
        password: this.password,
      })
      .subscribe(
        (response: any) => {
          console.log('Registration successful', response);
        },
        (error: any) => {
          console.error('Registration failed', error);
        }
      );
  }
}
