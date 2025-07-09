import { inject, Injectable } from '@angular/core';
import { ServiceApiService } from '../ServiceApi/service-api.service';
import { isTokenValid } from '../../../../environments/Token';
import { catchError } from 'rxjs/operators';
import { ICart } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class ServicecartService {

  apiService = inject(ServiceApiService);
  private token = '';

  // Method to get all carts
  getAllCarts() {
    if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    return this.apiService.getRequestWithHeaders<ICart[]>('/cart', this.token).pipe(
      catchError(error => {
        console.error('Error fetching all carts:', error);
        throw error;
      })
    );
  }
  // Method to post a new cart
  postCart(productId: string ) {
    console.log('Adding product to cart:', productId);
    if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    const ProductId = { productId: productId}; 
    return this.apiService.postRequestWithHeaders<ICart>('/cart/add', ProductId, this.token).pipe(
      catchError(error => {
        console.error('Error creating cart:', error);
        throw error;
      })
    );
  }
  // Method to delete a cart by ID
  deleteCart(product: string) {
    if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    return this.apiService.deleteRequestWithHeaders(`/cart/remove`, this.token , product).pipe(
      catchError(error => {
        console.error(`Error deleting cart with ID ${product}:`, error);
        throw error;
      })
    );
  }


  // Method to update the quantity of an item in the cart
  updateCartQuantity(productId: string, quantity: number) {
    if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    const updateData = { productId: productId  ,quantity: quantity };
    return this.apiService.patchRequestWithHeaders(`/cart`, updateData, this.token , "update-quantity" ).pipe(
      catchError(error => {
        console.error(`Error updating cart with ID ${productId}:`, error);
        throw error;
      })
    );
  }

  // Method to patch price of cart
  patchCartPrice(productId: string) {
    if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    const updateData = { productId: productId };
    return this.apiService.patchRequestWithHeaders(`/cart`, updateData, this.token , "update-price" ).pipe(
      catchError(error => {
        console.error(`Error patching cart price for product ID ${productId}:`, error);
        throw error;
      })
    );
  }
}
