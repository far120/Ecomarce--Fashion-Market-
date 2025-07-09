import { Component } from '@angular/core';
import { ServicecategoryBrandService } from '../../core/services/Servicecategory_Brand/servicecategory-brand.service';
import { ServiceProductService } from '../../core/services/ServiceProduct/service-product.service';
import { SharedModule } from '../../shared/shared.module';
import { ICategory, IBrand } from '../../core/models/model';
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
  constructor(private serviececategoryBrandService: ServicecategoryBrandService ,private productService: ServiceProductService) {}


  getCategories() {
    this.productService.getAllCategories().subscribe({
      next: (res: any) => {
        this.categories = res.categories;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  getBrands() {
    this.productService.getAllBrands().subscribe({
      next: (res: any) => {
        this.brands = res.brands;
      },
      error: (error) => {
        console.error('Error fetching brands:', error);
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
      }
    });
  }

  patchBrand(brandId: string) {
    this.serviececategoryBrandService.patchbrand(brandId).subscribe({
      next: (res) => {
        console.log('Brand approved successfully:', res);
        this.getBrands(); // Refresh brands after approval
      },
      error: (error) => {
        console.error('Error approving brand:', error);
      }
    });
  }

  ngOnInit() {
    this.getCategories();
    this.getBrands();
  }

}
