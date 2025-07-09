import { inject, Injectable } from '@angular/core';
import { ServiceApiService } from '../ServiceApi/service-api.service';
import { IOrder } from '../../models/model';
import { catchError } from 'rxjs';
import { isTokenValid } from '../../../../environments/Token';
@Injectable({
  providedIn: 'root'
})
export class ServiceorderService {

  servicesapi = inject(ServiceApiService);
  token: string = '';

  // Create a new order 
  createOrder(order: IOrder) {
    if (!isTokenValid()) {
      console.error('Token is invalid or expired');
      return;
    }
    this.token = localStorage.getItem('token') || '';
    return this.servicesapi.postRequestWithHeaders('/orders', order, this.token).pipe(
      catchError((error) => {
        console.error('Error creating order:', error);
        throw error;
      })
    );
  }

  // Get all orders
  getAllOrders() {
    if (!isTokenValid()) {
      console.error('Token is invalid or expired');
      return;
    }
    this.token = localStorage.getItem('token') || '';
    return this.servicesapi.getRequestWithHeaders('/orders', this.token).pipe(
      catchError((error) => {
        console.error('Error fetching orders:', error);
        throw error;
      })
    );  
  }

  // patch an order
  patchOrder(orderId: string , astatus: string) {
    if (!isTokenValid()) {
      console.error('Token is invalid or expired');
      return;
    }
    this.token = localStorage.getItem('token') || '';
    const orderStatus = { status: astatus }; // Use a different variable name to avoid deprecated 'status'
    return this.servicesapi.patchRequestWithHeaders(`/orders`, orderStatus, this.token, `${orderId}/status`).pipe(
      catchError((error) => {
        console.error(`Error patching order with ID ${orderId}:`, error);
        throw error;
      })
    );
  }
     

}
