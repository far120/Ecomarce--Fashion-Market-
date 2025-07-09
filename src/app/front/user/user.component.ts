import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceUSerService } from '../../core/services/ServiceUser/service-user.service';
import { IRegisterUser } from '../../core/models/model';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  patchForm!: FormGroup;
  selectedFile: File | null = null;
  
  constructor(private fb: FormBuilder , private serviceUser: ServiceUSerService) { 
    this.initializeForm();
  }

  initializeForm() {
    this.patchForm = this.fb.group({
      username: [''],
      email: [''],
      avatar: [''],
      phone: [''],
      address: [''],
    });
  }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    this.serviceUser.getUserProfile('/users/profile').subscribe({
      next: (response: any) => {
        const userData = response.user;
        if (userData) {
          this.patchForm.patchValue({
            username: userData.username || '',
            email: userData.email || '',
            avatar: userData.avatar || '',
            phone: userData.phone || '',
            address: userData.address || '',
          });
        } else {
          console.log('No user data found in response');
        }
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
      }
    });
  }


  onSubmit() {
    if (this.patchForm.valid) {
      const formData: IRegisterUser = this.patchForm.value;
      console.log('Form submitted:', formData);
    }
    else {
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

  updateProfile() {
    if (this.patchForm.valid) {
      const formData = new FormData();
      formData.append('username', this.patchForm.value.username);
      formData.append('email', this.patchForm.value.email);
      if (this.selectedFile) {
        formData.append('avatar', this.selectedFile, this.selectedFile.name);
      }
      formData.append('phone', this.patchForm.value.phone);
      formData.append('address', this.patchForm.value.address);

      console.log('Updating profile with data:', formData);

      this.serviceUser.updateProfile(formData).subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          this.getUserProfile(); // Reload updated data
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  

  // Reset form to original values
  resetForm() {
    this.getUserProfile(); // Reload original data
    this.selectedFile = null;
  }

  
}

