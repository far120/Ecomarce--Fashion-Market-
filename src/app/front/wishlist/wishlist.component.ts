import { Component } from '@angular/core';
import { ServicewishlistService } from '../../core/services/Servicewishlist/servicewishlist.service';
import { IWishlist } from '../../core/models/model';
import { SharedModule } from '../../shared/shared.module';
import { isTokenValid } from '../../../environments/Token';
import { ServicecartService } from '../../core/services/Servicecart/servicecart.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  wishlists: IWishlist[] = [];
  constructor(private serviceWishlist: ServicewishlistService , private serviceCart: ServicecartService ,  private toastService: ToastService) {
    this.loadWishlists();
  }
  loadWishlists() {
    if (!isTokenValid()) {
      console.error('Token is invalid or expired');
      return;
    }
    this.serviceWishlist.getAllWishlists().subscribe({
      next: (data: any) => {
        console.log('Data received:', data);
        if (data.wishlist) {
          this.wishlists = [data.wishlist];
        } else if (Array.isArray(data)) {
          this.wishlists = data;
        } else {
          this.wishlists = [];
        }
        console.log('Wishlists loaded successfully:', this.wishlists);
       
      },
      error: (error) => {
        console.error('Error fetching wishlists:', error);
      }
    });
  }

  deleteWishlist(wishlistId: string) {
    if (!isTokenValid()) {
      console.error('Token is invalid or expired');
      return;
    }
    if (!wishlistId) {
      console.error('Wishlist ID is required');
      return;
    }
    this.serviceWishlist.deleteWishlist(wishlistId).subscribe({
      next: () => {
        console.log(`Wishlist with ID ${wishlistId} deleted successfully`);
        this.loadWishlists(); 
        this.toastService.showSuccess('Wishlist deleted successfully!');
      },
      error: (error) => {
        console.error(`Error deleting wishlist with ID ${wishlistId}:`, error);
        this.toastService.showError(`Error deleting wishlist: ${error.message}`);
      }
    });
  }

  getProducts(wishlist: any): any[] {
    if (wishlist.products && Array.isArray(wishlist.products)) {
      return wishlist.products;
    }
    
    if (wishlist.items && Array.isArray(wishlist.items)) {
      return wishlist.items.map((item: any) => item.product).filter((product: any) => product);
    }

    return [];
  }


 postToCart(productId: string) {
    console.log('Adding product to cart:', productId);
    return this.serviceCart.postCart(productId).subscribe({
      next: (res: any) => {
        console.log('Product added to cart:', res);
        this.toastService.showSuccess('Product added to cart successfully!');
      },
      error: (error) => {
        console.error('Error adding product to cart:', error);
        this.toastService.showError('Error adding product to cart: ' + error.message);
      }
    });
  }

}
