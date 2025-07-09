import { Component } from '@angular/core';
import { ServicecartService } from '../../core/services/Servicecart/servicecart.service';
import { ServiceorderService } from '../../core/services/Serviceorder/serviceorder.service';
import { ICart } from '../../core/models/model';
import { isTokenValid } from '../../../environments/Token';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  carts: ICart[] = [];
  showCheckoutForm = false;
  checkoutAddress = '';
  checkoutPhone = '';
  checkoutError = '';
  cheatoutSuccess = false;
  allitems: any[] = [];

  constructor(private serviceCart: ServicecartService,private serviceOrder: ServiceorderService,private router: Router ,  private toastService: ToastService ) {
    this.loadCarts();
    // this.checkAndShowPriceChangeModal();
  }
  loadCarts() {
    if (!isTokenValid()) {
      console.error('Token is invalid or expired');
      return;
    }
    this.serviceCart.getAllCarts().subscribe({
      next: (data: any) => {
        if (data.cart) {
          this.carts = [data.cart];
        // } else if (Array.isArray(data)) {
        //   console.log('Data is an array:', data);
        //   this.carts = data;
        } else {
          this.carts = [];
        }
        this.allitems = this.carts.flatMap(cart => cart.items);
        console.log('All items:', this.allitems);
        console.log('Carts loaded successfully:', this.carts);
        this.checkAndShowPriceChangeModal();
      },
      error: (error) => {
        console.error('Error fetching carts:', error);
      }
    });
  }

  showPriceChangeModal = false;
  priceChangedItems: Array<{ name: string; oldPrice: number; newPrice: number; productId: string }> = [];

  checkAndShowPriceChangeModal() {
    console.log('Checking for price changes...');
    if (!this.allitems || this.allitems.length === 0) {
      console.log('No items to check for price changes.');
      return;
    }else {
      console.log('Items to check for price changes:', this.allitems);
    }

    this.priceChangedItems = this.allitems
      .filter(item => {
        console.log('Checking item:', item);
        const currentNewPrice = item.product?.newprice ;
        console.log('Current new price:', currentNewPrice);
        console.log('Item price:', item.price);
        return item.price !== currentNewPrice;
      })
      .map(item => ({
        name: item.product?.name || '',
        oldPrice: item.price,
        newPrice: item.product?.newprice,
        productId: item.product?._id || ''
      }));
    if (this.priceChangedItems.length > 0) {
      this.showPriceChangeModal = true;
    } 
    console.log('Price changed items:', this.priceChangedItems);
  }

  deleteCart(product: string) {
    if (!isTokenValid()) {
      console.error('Token is invalid or expired');
      return;
    }
    this.serviceCart.deleteCart(product).subscribe({
      next: () => {
        console.log(`Cart with ID ${product} deleted successfully`);
        this.showPriceChangeModal = false;
        this.loadCarts(); 
        this.toastService.showSuccess('Cart deleted successfully!');
      },
      error: (error) => {
        console.error(`Error deleting cart with ID ${product}:`, error);
        this.toastService.showError(`Error deleting cart: ${error.message}`);
      } 
    });
  }

  patchpricecart(productId: string) {
    if (!isTokenValid()) {
      console.error('Token is invalid or expired');
      return;
    }
    this.serviceCart.patchCartPrice(productId).subscribe({
      next: () => {
        console.log(`Price updated for product ID ${productId}`);
        this.showPriceChangeModal = false;
        this.loadCarts();
      },
      error: (error) => {
        console.error(`Error updating price for product ID ${productId}:`, error);
      }
    });
  }


  calculateSubtotal(): number {
    return this.carts.reduce((total, cart) => {
      return total + cart.items.reduce((cartTotal, item) => {
        const price = item.product?.newprice || item.product?.price || 0;
        return cartTotal + (price * item.quantity);
      }, 0);
    }, 0);
  }



  calculateTotal(): number {
    return this.calculateSubtotal() ;
  }

  getTotalItemCount(): number {
    return this.carts.reduce((total, cart) => {
      return total + cart.items.reduce((cartTotal, item) => cartTotal + item.quantity, 0);
    }, 0);
  }

  updateQuantity(cartId: string, productId: string, newQuantity: number) {
    if (!isTokenValid()) {
      console.error('Token is invalid or expired');
      return;
    }
    const cart = this.carts.find(c => c._id === cartId);
    if (!cart) {
      console.error(`Invalid cart ID ${cartId}`);
      return;
    }
    const item = cart.items.find(i => i.product && i.product._id === productId);
    if (!item || !item.product || !item.product._id) {
      console.error(`Invalid item or product for productId ${productId} in cart ID ${cartId}`);
      return;
    }
    if (newQuantity < 1 ||newQuantity > item.product.stock) {
      console.error(`Invalid quantity ${newQuantity} for productId ${productId} in cart ID ${cartId}`);
      return;
    }
    item.quantity = newQuantity;
    this.serviceCart.updateCartQuantity(productId, newQuantity).subscribe({
      next: () => {
        console.log(`Quantity updated for cart ID ${cartId}, product ID ${productId} to ${newQuantity}`);
        this.loadCarts();
        this.toastService.showSuccess(`Quantity updated successfully!`);
      },
      error: (error) => {
        if (error?.status === 403) {
          this.checkoutError = 'Access denied: insufficient permissions';
        } else {
          console.error(`Error updating quantity for cart ID ${cartId}, product ID ${productId}:`, error);
        }
      }
    });
  }
  increaseQuantity(cartId: string, productId: string, currentQuantity: number, maxStock: number) {
    if (currentQuantity < maxStock) {
      this.updateQuantity(cartId, productId, currentQuantity + 1);
    }
  }
  decreaseQuantity(cartId: string, productId: string, currentQuantity: number) {
    if (currentQuantity > 1) {
      this.updateQuantity(cartId, productId, currentQuantity - 1);
    }
  }



  submitOrder(form: any) {
    if (!isTokenValid()) {
      this.checkoutError = 'Token is invalid or expired';
      return;
    }
    if (!this.checkoutAddress || !this.checkoutPhone) {
      this.checkoutError = 'Please enter address and phone number.';
      return;
    }
    const allItems = this.carts.flatMap(cart => cart.items);
    if (!allItems.length) {
      this.checkoutError = 'Cart is empty.';
      return;
    }
    const products = allItems
      // .filter(item => item.product && item.product._id && item.quantity > 0)
      .map(item => ({
        product: item.product!._id,
        quantity: item.quantity
      }));
    if (!products.length) {
      this.checkoutError = 'No valid products in cart.';
      return;
    }
    const shippingDetails = { address: this.checkoutAddress, phone: this.checkoutPhone };
    (this.serviceOrder.createOrder as any)({ products, shippingDetails }).subscribe({
      next: (res: any) => {
        this.resetCheckoutForm();
        this.loadCarts();
        this.toastService.showSuccess('Order created successfully!');
      },
      error: (err: any) => {
      console.error('Error creating order:', err);
      this.toastService.showError('Error creating order: ' + (err?.message || 'Unknown error'));
      }
    });
  }

  resetCheckoutForm() {
  this.showCheckoutForm = false;
    this.checkoutAddress = '';
    this.checkoutPhone = '';
    this.checkoutError = '';
  }
    
}

