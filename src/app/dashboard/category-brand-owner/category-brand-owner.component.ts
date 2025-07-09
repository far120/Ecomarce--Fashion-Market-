import { Component } from '@angular/core';
import { ServicecategoryBrandService } from '../../core/services/Servicecategory_Brand/servicecategory-brand.service';
import { ServiceProductService } from '../../core/services/ServiceProduct/service-product.service';
import { SharedModule } from '../../shared/shared.module';
import { ICategory, IBrand } from '../../core/models/model';
import { ToastService } from '../../core/services/toast.service';
@Component({
  selector: 'app-category-brand-owner',
  standalone: true,
  imports: [],
  templateUrl: './category-brand-owner.component.html',
  styleUrl: './category-brand-owner.component.css'
})
export class CategoryBrandOwnerComponent {
  categories: ICategory[] = [];
  brands: IBrand[] = [];
  constructor(private serviececategoryBrandService: ServicecategoryBrandService ,private productService: ServiceProductService ,  private toastService: ToastService) {}


  getCategories() {
    this.productService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res.categories;
        console.log('Categories fetched successfully:', this.categories);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.toastService.showError('Error fetching categories: ' + error.message);
      }
    });
  }

  getBrands() {
    this.productService.getAllBrands().subscribe({
      next: (res: any) => {
        this.brands = res.brands;
        console.log('Brands fetched successfully:', this.brands);
      },
      error: (error) => {
        console.error('Error fetching brands:', error);
        this.toastService.showError('Error fetching brands: ' + error.message);
      }
    });
  }



  patchCategory(categoryId: string) {
    this.serviececategoryBrandService.patchctegory(categoryId).subscribe({
      next: (res) => {
        console.log('Category approved successfully:', res);
        this.getCategories(); 
      },
      error: (error) => {
        console.error('Error approving category:', error);
        this.toastService.showError('Error approving category: ' + error.message);
      }
    });
  }

  patchBrand(brandId: string) {
    this.serviececategoryBrandService.patchbrand(brandId).subscribe({
      next: (res) => {
        console.log('Brand approved successfully:', res);
        this.getBrands(); 

      },
      error: (error) => {
        console.error('Error approving brand:', error);
        this.toastService.showError('Error approving brand: ' + error.message);
      }
    });
  }

  ngOnInit() {
    this.getCategories();
    this.getBrands();
  }

}
