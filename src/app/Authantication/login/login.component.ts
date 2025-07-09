import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ServiceAuthService } from '../../core/services/ServiceAuth/service-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private authService: ServiceAuthService, 
    private fb: FormBuilder, 
    private Router: Router,
    private toastService: ToastService
  ) {
    
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ] ],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.Login();
    } else {
      this.toastService.showError('Please fill in all required fields correctly');
    }
  }



  resetForm() {
    this.loginForm.reset();
    this.initializeForm();
  }

  Login() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      console.log('Login credentials:', credentials);      
      this.authService.loginUser(credentials).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.token);
          this.toastService.showSuccess('Login successful! Welcome back!');
          this.Router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          const errorMessage = error.error?.message || 'Login failed. Please check your credentials.';
          this.toastService.showError(errorMessage);
        }
      });
    }
  }

  // Getter methods for form controls
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }



}
