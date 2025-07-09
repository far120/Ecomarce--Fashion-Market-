import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { ServicecategoryBrandService } from '../../core/services/Servicecategory_Brand/servicecategory-brand.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-category-brand',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './category-brand.component.html',
  styleUrl: './category-brand.component.css'
})
export class CategoryBrandComponent {

  ctegoryform!: FormGroup;
  brandform!: FormGroup;

  constructor(private fb: FormBuilder , private categoryBrandService: ServicecategoryBrandService ,  private toastService: ToastService) {
    this.intializecategoryForm();
    this.initializebrandForm();
  }

  intializecategoryForm() {
    this.ctegoryform = this.fb.group({
      name: [''],
    });
  }
  initializebrandForm() {
    this.brandform = this.fb.group({
      name: [''],
    });
  }
   
postCategory() {
  // Send as JSON object instead of FormData so backend can destructure req.body.name
  const categoryData = {
    name: this.ctegoryform.value.name
  };
  console.log('Category Data:', categoryData); // Debugging line to check data
  this.categoryBrandService.postcategory(categoryData).subscribe({
    next: (res) => {
      console.log('Category created successfully:', res);
      this.toastService.showSuccess('Category created successfully!');
      this.ctegoryform.reset();
    },
    error: (error) => {
      console.error('Error creating category:', error);
      this.toastService.showError('Error creating category: ' + error.message);
    }
  });
}
  postBrand() {
    const formData = new FormData();
    formData.append('name', this.brandform.value.name);
    this.categoryBrandService.postbrand(formData).subscribe({
      next: (res) => {
        console.log('Brand created successfully:', res);
        this.brandform.reset();
        this.toastService.showSuccess('Brand created successfully!');
      },
      error: (error) => {
        console.error('Error creating brand:', error);
        this.toastService.showError('Error creating brand: ' + error.message);
      }
    });
  }

  

}