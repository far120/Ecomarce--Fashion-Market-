import { inject, Injectable } from '@angular/core';
import { IWishlist } from '../../models/model';
import { ServiceApiService } from '../ServiceApi/service-api.service';
import { isTokenValid } from '../../../../environments/Token';
import { catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServicewishlistService {

  serviceApi = inject(ServiceApiService);
  token = '';
  // Method to get all wishlists
  getAllWishlists() {
    if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    return this.serviceApi.getRequestWithHeaders<IWishlist[]>('/wishlist', this.token).pipe(
      catchError(error => {
        console.error('Error fetching all wishlists:', error);
        throw error;
      })
    );
  }

  // Method to post a new wishlist
  postWishlist(productId : string ) {
    console.log('Adding product to wishlist:', productId);
    if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    const ProductId = { productId: productId };
    return this.serviceApi.postRequestWithHeaders<IWishlist>('/wishlist/add', ProductId, this.token).pipe(
      catchError(error => {
        console.error('Error creating wishlist:', error);
        throw error;
      })
    );
  }

  // Method to delete a wishlist by ID
  deleteWishlist(wishlistId: string) {
     if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    return this.serviceApi.deleteRequestWithHeaders(`/wishlist/remove`, this.token, wishlistId).pipe(
      catchError(error => {
        console.error(`Error deleting wishlist with ID ${wishlistId}:`, error);
        throw error;
      })
    );
  }

 
}
