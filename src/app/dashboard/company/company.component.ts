import { Component } from '@angular/core';
import { ICompany } from '../../core/models/model';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicecompanyService } from '../../core/services/Servicecompany/servicecompany.service';
import { ToastService } from '../../core/services/toast.service';
@Component({
  selector: 'app-company',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {

  companyform!: FormGroup;
  companies: ICompany[] = [];
  isModalOpen = false;


  constructor(private companyService: ServicecompanyService , private fb : FormBuilder , private toastService: ToastService) {
    this.loadCompanies();
    this.initializeForm();
  }
  initializeForm() {
    this.companyform = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      logo: [''],
      emailDomain: ['', [Validators.required]],
      description: [''],
      address: [''],
      contactNumber: ['', [Validators.pattern(/^\+?[\d\s\-\(\)]{5,15}$/)]]
    });
  }
  loadCompanies() {
    this.companyService.getAllCompanies().subscribe({
      next: (data: any) => {
          this.companies = data.companies;
        console.log('Companies loaded successfully:', this.companies);
        console.log('Companies count:', this.companies.length);
      },
      error: (error) => {
        console.error('Error loading companies:', error);
        this.companies = [];
      }
    });
  }
  createCompany() {
    if (this.companyform.valid) {
      const newCompany: ICompany = this.companyform.value;
      this.companyService.createCompany(newCompany).subscribe({
        next: (data) => {
          console.log('Company created successfully:', data);
          this.loadCompanies(); 
          this.closeModal();
          this.toastService.showSuccess('Company created successfully!');
        },
        error: (error) => {
          console.error('Error creating company:', error);
          this.toastService.showError('Error creating company: ' + error.message);
        }
      });
    }
    else {
      console.error('Form is invalid. Please fill in all required fields.');
    }
  }
  resetForm() {
    this.companyform.reset();
  }

  toggleCompanyStatus(companyId: string) {
    this.companyService.patchCompany(companyId).subscribe({
      next: (data) => {
        console.log('Company status toggled successfully:', data);
        this.loadCompanies(); 
        this.toastService.showSuccess('Company status toggled successfully!');
      },
      error: (error) => {
        console.error('Error toggling company status:', error);
        this.toastService.showError('Error toggling company status: ' + error.message);
      }
    });
  }

 

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.companyform.reset();
  }

}
