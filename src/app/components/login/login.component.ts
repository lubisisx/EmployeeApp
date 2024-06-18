import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);

  loginForm = new FormGroup({
    username: this.username,
    password: this.password,
  });

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('attempting to login');
    this.authService.login(this.loginForm.value).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        this.authService.setRole(response.role);

        if (response.role === 'admin') {
          this.router.navigate(['/employees']);
        } else {
          this.router.navigate(['/profile']);
        }
      },
      (error: any) => {
        console.error('Login failed', error);
      }
    );
  }
}
