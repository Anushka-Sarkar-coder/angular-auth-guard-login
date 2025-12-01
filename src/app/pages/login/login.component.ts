import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  images = [
    'https://img.freepik.com/premium-vector/mobile-login-concept-illustration_114360-83.jpg',
    'https://media.istockphoto.com/id/1305268276/vector/registration-abstract-concept-vector-illustration.jpg?s=612x612&w=0&k=20&c=nfvUbHjcNDVIPdWkaxGx0z0WZaAEuBK9SyG-aIqg2-0=',
    'https://t3.ftcdn.net/jpg/03/39/70/90/360_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg'
  ];

  agree = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const enteredEmail = this.loginForm.value.email;
    const enteredPassword = this.loginForm.value.password;

    this.authService.getAllUsers().subscribe((users: any[]) => {
      const userFound = users.find(
        u => u.email === enteredEmail && u.password === enteredPassword
      );

      if (userFound) {
        console.log("Login successful!");

        // set auth state (so guard will allow dashboard)
        this.authService.setLogin(userFound);

        // optionally save login record in db.json as before
        this.authService.loginUser(this.loginForm.value).subscribe({
          next: () => {
            this.router.navigate(['/dashboard']);
          },
          error: () => {
            // even if storing login record fails, still navigate (optional)
            this.router.navigate(['/dashboard']);
          }
        });

      } else {
        console.log("Invalid email or password");
        // show a user-visible error (toast / template message)
      }
    });
  }
}
