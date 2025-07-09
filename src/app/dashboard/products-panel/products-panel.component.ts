import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceProductService } from '../../core/services/ServiceProduct/service-product.service';
import { IProduct, ICategory, IBrand } from '../../core/models/model';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-products-panel',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './products-panel.component.html',
  styleUrl: './products-panel.component.css'
})
export class ProductsPanelComponent {
  products: IProduct[] = [];
  categories: ICategory[] = [];
  brands: IBrand[] = [];
  filteredProducts: IProduct[] = [];

  selectedFile: File | null = null;
  
  // Filter properties
  selectedStatus: string = 'all';
  selectedCategory: string = 'all';
  selectedBrand: string = 'all';
  selectedTargetAudience: string = 'all';
  selectedPriceRange: string = 'all';
  selectedCreatedAt: string = 'all';
  statusOptions = [
    { value: 'all', label: 'All Products' },
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending' },
    { value: 'notAvailable', label: 'Not Available' }
  ];

  targetAudienceOptions = [
    { value: 'all', label: 'All Audiences' },
    { value: 'unisex', label: 'Unisex' },
    { value: 'men', label: 'Men' },
    { value:'women', label:'Women' },
    { value: 'kids', label: 'Kids' }
  ];

  createdAtOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last24Hours', label: 'Last 24 Hours' },
    { value: 'last7Days', label: 'Last 7 Days' },
    { value: 'last30Days', label: 'Last 30 Days' }
  ];

  priceRangeOptions = [
    { value: 'all', label: 'All Prices' },
    { value: '0-100', label: '$0 - $100' },
    { value: '101-500', label: '$101 - $500' },
    { value: '501-1000', label: '$501 - $1000' },
    { value: '1001+', label: '$1001+' }
  ];

  productForm!: FormGroup;

  // Modal state
  showProductModal: boolean = false;
  isEditMode: boolean = false;
  editingProductId: string | null = null;

  constructor(private productService: ServiceProductService, private fb: FormBuilder) {
    this.initializeForm();
    this.loadProducts();
    this.getCategories();
    this.getBrands();
  }

  initializeForm() {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [0],
      stock: [0],
      targetAudience: ['unisex'],
      category: [''],
      brand: [''],
      company: [''],
      createdBy: [''],
      discount: [0]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  onSubmitProduct(): void {
    if (this.productForm.invalid) return;
    const formData = new FormData();
    const values = this.productForm.value;

    Object.keys(values).forEach(key => {
      formData.append(key, values[key]);
    });

    if (this.selectedFile) {
      formData.append('images', this.selectedFile); 
    }

    if (this.isEditMode && this.editingProductId) {
      this.updateProduct(this.editingProductId, formData);
    } else {
      this.addProduct(formData);
    }
  }

  addProduct(formData: any) {
    this.productService.createProduct(formData).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
        this.closeProductModal();
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error adding product:', error);
      }
    });
  }

  updateProduct(productId: string, formData: any) {
    this.productService.updateProduct(productId, formData).subscribe({
      next: (response) => {
        console.log('Product updated successfully:', response);
        this.closeProductModal();
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error updating product:', error);
      }
    });
  }

  openAddProductModal() {
    this.isEditMode = false;
    this.editingProductId = null;
    this.showProductModal = true;
    this.resetForm();
  }

  openEditProductModal(product: IProduct) {
    this.isEditMode = true;
    this.editingProductId = product._id || null;
    this.showProductModal = true;

    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      images: product.images, 
      targetAudience: product.targetAudience,
      category: product.category?._id || '',
      brand: product.brand?._id || '',
      company: product.company,
      createdBy: product.createdBy,
      discount: product.discount || 0,
    });

    this.selectedFile = null;
  }

  closeProductModal() {
    this.showProductModal = false;
    this.isEditMode = false;
    this.editingProductId = null;
    this.resetForm();
  }

  resetForm() {
    this.productForm.reset({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      targetAudience: 'unisex',
      category: '',
      brand: '',
      company: '',
      createdBy: '',
      discount: 0
    });
    this.selectedFile = null;
  }

  // Update the loadProducts method to use applyFilters
  loadProducts() {
    this.productService.getProductsByCompanyId().subscribe({
      next: (res: any) => {
        this.products = res.products || res;
        this.filteredProducts = [...this.products];
        this.applyFilter();
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }

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

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe({
      next: (response) => {
        console.log('Product deleted successfully:', response);
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error deleting product:', error);
      }
    });
  }


  // Get dynamic category options
  get categoryOptions() {
    const allOption = { value: 'all', label: 'All Categories' };
    const categoryOpts = this.categories.map(cat => ({ 
      value: cat._id || '', 
      label: cat.name 
    }));
    return [allOption, ...categoryOpts];
  }

  // Get dynamic brand options
  get brandOptions() {
    const allOption = { value: 'all', label: 'All Brands' };
    const brandOpts = this.brands.map(brand => ({ 
      value: brand._id || '', 
      label: brand.name 
    }));
    return [allOption, ...brandOpts];
  }

  // Filter change handlers
  onStatusFilterChange(event: any) {
    this.selectedStatus = event.target.value;
    this.applyFilter();
  }

  onCategoryFilterChange(event: any) {
    this.selectedCategory = event.target.value;
    this.applyFilter();
  }

  onBrandFilterChange(event: any) {
    this.selectedBrand = event.target.value;
    this.applyFilter();
  }

  onTargetAudienceFilterChange(event: any) {
    this.selectedTargetAudience = event.target.value;
    this.applyFilter();
  }

  onPriceRangeFilterChange(event: any) {
    this.selectedPriceRange = event.target.value;
    this.applyFilter();
  }

  onCreatedAtFilterChange(event: any) {
    this.selectedCreatedAt = event.target.value;
    this.applyFilter();
  }

  // Clear all filters
  clearAllFilters() {
    this.selectedStatus = 'all';
    this.selectedCategory = 'all';
    this.selectedBrand = 'all';
    this.selectedTargetAudience = 'all';
    this.selectedPriceRange = 'all';
    this.selectedCreatedAt = 'all';
    this.applyFilter();
  }

  // Check if any filter is active
  get hasActiveFilters(): boolean {
    return this.selectedStatus !== 'all' || 
           this.selectedCategory !== 'all' || 
           this.selectedBrand !== 'all' || 
           this.selectedTargetAudience !== 'all' || 
           this.selectedPriceRange !== 'all' || 
           this.selectedCreatedAt !== 'all';
  }

    // Apply all filters
  applyFilter() {
    this.filteredProducts = this.products.filter(product => {
      // Status filter
      if (this.selectedStatus !== 'all' && product.status !== this.selectedStatus) {
        return false;
      }

      // Category filter
      if (this.selectedCategory !== 'all') {
        const productCategoryId = typeof product.category === 'object' ? product.category?._id : product.category;
        if (productCategoryId !== this.selectedCategory) {
          return false;
        }
      }

      // Brand filter
      if (this.selectedBrand !== 'all') {
        const productBrandId = typeof product.brand === 'object' ? product.brand?._id : product.brand;
        if (productBrandId !== this.selectedBrand) {
          return false;
        }
      }

      // Target audience filter
      if (this.selectedTargetAudience !== 'all' && product.targetAudience !== this.selectedTargetAudience) {
        return false;
      }

      // Price range filter
      if (this.selectedPriceRange !== 'all') {
        const price = product.price;
        switch (this.selectedPriceRange) {
          case '0-100':
            if (price < 0 || price > 100) return false;
            break;
          case '101-500':
            if (price < 101 || price > 500) return false;
            break;
          case '501-1000':
            if (price < 501 || price > 1000) return false;
            break;
          case '1001+':
            if (price <= 1000) return false;
            break;
        }
      }

      // Created date filter
      if (this.selectedCreatedAt !== 'all' && product.createdAt) {
        const productDate = new Date(product.createdAt);
        const now = new Date();
        const diffInHours = (now.getTime() - productDate.getTime()) / (1000 * 60 * 60);
        
        switch (this.selectedCreatedAt) {
          case 'last24Hours':
            if (diffInHours > 24) return false;
            break;
          case 'last7Days':
            if (diffInHours > 24 * 7) return false;
            break;
          case 'last30Days':
            if (diffInHours > 24 * 30) return false;
            break;
        }
      }

      return true;
    });
  }


  getStatusCount(status: string): number {
    if (status === 'all') {
      return this.products.length;
    }
    return this.products.filter(product => product.status === status).length;
  }

  // Get count for each category
  getCategoryCount(categoryId: string): number {
    if (categoryId === 'all') {
      return this.products.length;
    }
    return this.products.filter(product => {
      const productCategoryId = typeof product.category === 'object' ? product.category?._id : product.category;
      return productCategoryId === categoryId;
    }).length;
  }

  // Get count for each brand
  getBrandCount(brandId: string): number {
    if (brandId === 'all') {
      return this.products.length;
    }
    return this.products.filter(product => {
      const productBrandId = typeof product.brand === 'object' ? product.brand?._id : product.brand;
      return productBrandId === brandId;
    }).length;
  }

  // Get count for each target audience
  getTargetAudienceCount(audience: string): number {
    if (audience === 'all') {
      return this.products.length;
    }
    return this.products.filter(product => product.targetAudience === audience).length;
  }

  // Get count for each price range
 getPriceRangeCount(range: string): number {
     if (range === 'all') {
       return this.products.length;
     }
     return this.products.filter(product => {
       const price = product.price;
       switch (range) {
         case '0-100':
           return price >= 0 && price <= 100;
         case '101-500':
           return price >= 101 && price <= 500;
         case '501-1000':
           return price >= 501 && price <= 1000;
         case '1001+':
           return price > 1000;
         default:
           return false;
       }
     }).length;
   }


  

  
}
