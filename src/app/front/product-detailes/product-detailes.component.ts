import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { IProduct , ICart , IWishlist } from '../../core/models/model';
import { isTokenValid } from '../../../environments/Token';
import { ServiceProductService } from '../../core/services/ServiceProduct/service-product.service';
import { ActivatedRoute } from '@angular/router';
import { ServicecartService } from '../../core/services/Servicecart/servicecart.service';
import { ServicewishlistService } from '../../core/services/Servicewishlist/servicewishlist.service';

@Component({
  selector: 'app-product-detailes',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-detailes.component.html',
  styleUrl: './product-detailes.component.css'
})
export class ProductDetailesComponent {
  products: IProduct[] = [];


  constructor(private serviceProduct: ServiceProductService,private cartService: ServicecartService, private wishlistService: ServicewishlistService, private route: ActivatedRoute ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.loadProductsByID(productId);
      } else {
        console.error('No product ID found in route');
      }
    });
  }


  loadProductsByID(productId: string) {
    if (!isTokenValid()) {
      console.error('Token is invalid or expired');
      return;
    }
    if (!productId) {
      console.error('Product ID is required');
      return;
    }
    this.serviceProduct.getProductById(productId).subscribe({
      next: (data: any) => {
        console.log('Data received:', data);
        this.products = [data.product]; 
        console.log('Product loaded successfully:', this.products);
      },
      error: (error) => {
        console.error('Error fetching product:', error);
      }
    });
 
}

 postToCart(productId: string) {
    console.log('Adding product to cart:', productId);
    return this.cartService.postCart(productId).subscribe({
      next: (res: any) => {
        console.log('Product added to cart:', res);
      },
      error: (error) => {
        console.error('Error adding product to cart:', error);
      }
    });
  }

  postToWishlist(productId: string) {
    return this.wishlistService.postWishlist(productId).subscribe({
      next: (res: IWishlist) => {
        console.log('Product added to wishlist:', res);
      },
      error: (error) => {
        console.error('Error adding product to wishlist:', error);
      }
    });
  }
    
}