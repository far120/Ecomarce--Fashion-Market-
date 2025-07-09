import { Component } from '@angular/core';
import { ServiceProductService } from '../../core/services/ServiceProduct/service-product.service';
import { IProduct , IBrand ,ICategory } from '../../core/models/model';
import { catchError } from 'rxjs/operators';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: IProduct[] = [];
  categories: ICategory[] = [];
  brands: IBrand[] = [];

  filteredProducts: IProduct[] = [];
  
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

  

  constructor(private productService: ServiceProductService) {
    this.loadProducts();
    this.getCategories();
    this.getBrands();
  }
  
  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res.products; 
        console.log('Products:', this.products);
        this.filteredProducts = [...this.products]; 
        this.applyFilters(); 

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
    this.applyFilters();
  }

  onCategoryFilterChange(event: any) {
    this.selectedCategory = event.target.value;
    this.applyFilters();
  }

  onBrandFilterChange(event: any) {
    this.selectedBrand = event.target.value;
    this.applyFilters();
  }

  onTargetAudienceFilterChange(event: any) {
    this.selectedTargetAudience = event.target.value;
    this.applyFilters();
  }

  onPriceRangeFilterChange(event: any) {
    this.selectedPriceRange = event.target.value;
    this.applyFilters();
  }

  onCreatedAtFilterChange(event: any) {
    this.selectedCreatedAt = event.target.value;
    this.applyFilters();
  }

  // Clear all filters
  clearAllFilters() {
    this.selectedStatus = 'all';
    this.selectedCategory = 'all';
    this.selectedBrand = 'all';
    this.selectedTargetAudience = 'all';
    this.selectedPriceRange = 'all';
    this.selectedCreatedAt = 'all';
    this.applyFilters();
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
  applyFilters() {
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


  // Get count for each status
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


  // Method to approve a product
  approveProduct(productId: string) {
    this.productService.approveProduct(productId).subscribe({
      next: (response) => {
        console.log('Product approved successfully:', response);
        this.loadProducts(); // Reload products after approval
      },
      error: (error) => {
        console.error('Error approving product:', error);
      }
    });
  }
  // Method to delete a product
  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe({
      next: (response) => {
        console.log('Product deleted successfully:', response);
        this.loadProducts(); // Reload products after deletion
      },
       error: (error) => {
        console.error('Error deleting product:', error);
      } 
    });
  }


}
