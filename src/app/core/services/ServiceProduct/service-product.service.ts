import { inject, Injectable } from "@angular/core";
import { IProduct } from "../../models/model";
import { ServiceApiService } from "../ServiceApi/service-api.service";
import { isTokenValid } from '../../../../environments/Token';
import { catchError } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ServiceProductService {

  http = inject(HttpClient);
  ProductService = inject(ServiceApiService);
  private token = '';

  

// Method to get all products
getAllProducts() {
  if (!isTokenValid()) {
    throw new Error('Token is invalid or expired');
  }
  this.token = localStorage.getItem('token') || '';
  return this.ProductService.getRequestWithHeaders<IProduct[]>('/products', this.token).pipe(
    catchError((error) => {
      console.error('Error fetching all products:', error);
      throw error;
    })
  );
}

getAllProductsall() {
  return this.ProductService.getRequest<IProduct[]>('/products/all').pipe(
    catchError((error) => {
      console.error('Error fetching all products:', error);
      throw error;
    }
  ));
 
}

// Method to get a single product by ID
getProductById(productId: string) {
  if (!isTokenValid()) {  
    throw new Error('Token is invalid or expired');
  }
  this.token = localStorage.getItem('token') || '';
  return this.ProductService.getRequestWithHeaders<IProduct>(`/products/${productId}`, this.token).pipe(
    catchError((error) => {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw error;
    })
  );
}


// Method to create a new product
createProduct(productData: IProduct) {
  if (!isTokenValid()) {
    throw new Error('Token is invalid or expired');
  }
  this.token = localStorage.getItem('token') || '';
  console.log('Creating product with data:', productData);
  return this.ProductService.postRequestWithHeaders<IProduct>('/products', productData, this.token).pipe(
    catchError((error) => {
      console.error('Error creating product:', error);
      throw error;
    })
  );
}

// Method to update an existing product
updateProduct(productId: string, productData: IProduct) {
  if (!isTokenValid()) {
    throw new Error('Token is invalid or expired');
  }
  this.token = localStorage.getItem('token') || '';
  return this.ProductService.putRequestWithHeaders<IProduct>(`/products`, productData, this.token , productId).pipe(
    catchError((error) => {
      console.error(`Error updating product with ID ${productId}:`, error);
      throw error;
    })
  );
}

// Method to delete a product
deleteProduct(productId: string) {
  if (!isTokenValid()) {
    throw new Error('Token is invalid or expired');
  }
  this.token = localStorage.getItem('token') || '';
  return this.ProductService.deleteRequestWithHeaders<IProduct>(`/products`, this.token , productId).pipe(
    catchError((error) => {
      console.error(`Error deleting product with ID ${productId}:`, error);
      throw error;
    })
  );
}

// Method to approve a product
approveProduct(productId: string) {
  if (!isTokenValid()) {
    throw new Error('Token is invalid or expired');
  }
  this.token = localStorage.getItem('token') || '';
  return this.ProductService.patchRequestWithHeaders<IProduct>(`/products`, {} ,this.token  ,`${productId}/approve` ).pipe(
    catchError((error) => {
      console.error(`Error approving product with ID ${productId}:`, error);
      throw error;
    })
  );
}

getproductById(productId: string) {
  if (!isTokenValid()) {
    throw new Error('Token is invalid or expired');
  }
  this.token = localStorage.getItem('token') || '';
  return this.ProductService.getRequestWithHeaders<IProduct>(`/products/${productId}`, this.token).pipe(
    catchError((error) => {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw error;
    }
  ));
}



// Method to get products by company ID
getProductsByCompanyId() {
  if (!isTokenValid()) {
    throw new Error('Token is invalid or expired');
  }
  this.token = localStorage.getItem('token') || '';
  return this.ProductService.getRequestWithHeaders<IProduct[]>(`/products/company/products`, this.token).pipe(
    catchError((error) => {
      console.error('Error fetching products by company ID:', error);
      throw error;
    })
  );
}

// Get all categories
getAllCategories() {
  if (!isTokenValid()) {
    throw new Error('Token is invalid or expired');
  }
  this.token = localStorage.getItem('token') || '';
  return this.ProductService.getRequestWithHeaders<IProduct[]>(`/categories`, this.token).pipe(
    catchError((error) => {
      console.error('Error fetching all categories:', error);
      throw error;
    })
  );
}

getAllCategoriesall() {
  
  return this.ProductService.getRequest<IProduct[]>(`/categories`).pipe(
    catchError((error) => {
      console.error('Error fetching all categories:', error);
      throw error;
    })
  );
}



// Get all brands
getAllBrands() {
  if (!isTokenValid()) {
    throw new Error('Token is invalid or expired');
  }
  this.token = localStorage.getItem('token') || '';
  return this.ProductService.getRequestWithHeaders<IProduct[]>(`/brands`, this.token).pipe(
    catchError((error) => {
      console.error('Error fetching all brands:', error);
      throw error;
    }
  ));
}

getAllBrandsall() {
  this.token = localStorage.getItem('token') || '';
  return this.ProductService.getRequest<IProduct[]>(`/brands`).pipe(
    catchError((error) => {
      console.error('Error fetching all brands:', error);
      throw error;
    }
  ));
}

// Get products by filter (price, category, brand,   targetAudience ,createdAt , status , isVisible)
// getProductsByFilter(filter: any) {
//   if (!isTokenValid()) {
//     throw new Error('Token is invalid or expired');
//   }
//   this.token = localStorage.getItem('token') || '';
  
//   // Build query parameters from filter object
//   let queryParams = new URLSearchParams();
  
//   if (filter.price) {
//     queryParams.append('price', filter.price);
//   }
//   if (filter.category) {
//     queryParams.append('category', filter.category);
//   }
//   if (filter.brand) {
//     queryParams.append('brand', filter.brand);
//   }
//   if (filter.targetAudience) {
//     queryParams.append('targetAudience', filter.targetAudience);
//   }
//   if (filter.createdAt) {
//     queryParams.append('createdAt', filter.createdAt);
//   }
//   if (filter.status) {
//     queryParams.append('status', filter.status);
//   }
//   if (filter.isVisible !== undefined) {
//     queryParams.append('isVisible', filter.isVisible.toString());
//   }
  
//   const queryString = queryParams.toString();
//   const endpoint = queryString ? `/products/filter?${queryString}` : '/products/filter';
  
//   return this.ProductService.getRequestWithHeaders<IProduct[]>(endpoint, this.token).pipe(
//     catchError((error) => {
//       console.error('Error fetching products by filter:', error);
//       throw error;
//     })
//   );
// }


}






