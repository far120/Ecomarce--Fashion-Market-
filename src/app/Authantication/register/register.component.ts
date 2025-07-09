import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ServiceAuthService } from '../../core/services/ServiceAuth/service-auth.service';
import { IRegisterUser } from '../../core/models/model';
import { SharedModule } from '../../shared/shared.module';
import { isTokenValid } from '../../../environments/Token';
import { ServicecompanyService } from '../../core/services/Servicecompany/servicecompany.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  selectedFile: File | null = null;
  companies: any[] = [];
  token: string = '';
  Role: string = '';
  
  constructor(private fb: FormBuilder, private authService: ServiceAuthService, private router: Router, private companyService: ServicecompanyService) {}
  
  ngOnInit() {
    this.initializeForm();
    this.checkToken();
    this.loadCompanies();
  }

  checkToken() {
    if (isTokenValid()) {
      this.token = localStorage.getItem('token') || '';
      const decodedToken = JSON.parse(atob(this.token.split('.')[1]));
      this.Role = decodedToken.role || '';   
    }
  }

  loadCompanies() {
    this.companyService.getAllCompanies().subscribe({
      next: (data: any) => {
        this.companies = data.companies || [];
        console.log('Companies loaded successfully:', this.companies);
        console.log('Companies count:', this.companies.length);
        // Log company IDs for debugging
        this.companies.forEach((company, index) => {
          console.log(`Company ${index + 1}: ID=${company._id || company.id}, Name=${company.name || company.companyname}`);
        });
      },
      error: (error) => {
        console.error('Error loading companies:', error);
        this.companies = [];
      }
    });
  }

  get companyOptions() {
    const allOption = { value: 'all', label: 'All Companies' };
    const companyOptions = this.companies.map(company => ({
      value: company._id || company.id || '',
      label: company.name || company.companyname || 'Unknown Company'
    }));
    return [allOption, ...companyOptions];
  }

  onCompanyChange(event: any) {
    const selectedCompanyId = event.target.value;
    console.log('Selected company:', selectedCompanyId);
    // Handle company selection if needed
  }

  getSelectedCompanyName(): string {
    const selectedCompanyId = this.registerForm.get('companyId')?.value;
    if (selectedCompanyId) {
      const company = this.companies.find(c => (c._id || c.id) === selectedCompanyId);
      return company ? (company.name || company.companyname || 'Unknown Company') : '';
    }
    return '';
  }


  initializeForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      avatar: [null], // Will handle file separately
      phone: ['', [Validators.pattern(/^[0-9+\-\s()]+$/)]],
      address: [''],
      role: ['user'], // Default role
      companyId: [''], // Changed from companyname to companyId
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator to check password confirmation
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.register();
    } else {
      console.log('Form is invalid');
    }
  }
  
  onFileSelected(event: any) {
  if (event.target.files && event.target.files.length > 0) {
    this.selectedFile = event.target.files[0];
  } else {
    this.selectedFile = null; // Reset if no file is selected
  }
}

  register() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('email', this.registerForm.value.email);
      formData.append('password', this.registerForm.value.password);
      formData.append('username', this.registerForm.value.username);
      if (this.selectedFile) {
        formData.append('avatar', this.selectedFile);
      }
      formData.append('phone', this.registerForm.value.phone || '');
      formData.append('address', this.registerForm.value.address || '');
      formData.append('role', this.registerForm.value.role || 'user'); 
      
      // Handle company selection properly
      const selectedCompanyId = this.registerForm.value.companyId;
      if (selectedCompanyId && selectedCompanyId !== '' && selectedCompanyId !== 'all') {
        // Check if the selected company exists in our companies array
        const selectedCompany = this.companies.find(c => (c._id || c.id) === selectedCompanyId);
        if (selectedCompany) {
          formData.append('companyId', selectedCompanyId);
          console.log('Selected company:', selectedCompany);
        } else {
          console.warn('Selected company not found in companies list:', selectedCompanyId);
        }
      }
      
      console.log('Form submitted:', formData);
      console.log('Available companies:', this.companies);
      this.authService.registerUserWithFile(formData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          if (this.Role === 'owner') {
            this.router.navigate(['/dashboard']);
          }else {
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          console.error('Registration failed:', error);
        }
      });
    }
  }

}


