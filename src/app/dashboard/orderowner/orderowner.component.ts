import { Component } from '@angular/core';
import { ServiceorderService } from '../../core/services/Serviceorder/serviceorder.service';
import { IOrder } from '../../core/models/model';
import { throwError } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { ToastService } from '../../core/services/toast.service';


@Component({
  selector: 'app-orderowner',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './orderowner.component.html',
  styleUrl: './orderowner.component.css'
})
export class OrderownerComponent {
  orders: IOrder[] = [];
  filteredOrders: IOrder[] = [];
  statusFilter= '';
  constructor(private serviceOrder: ServiceorderService ,  private toastService: ToastService) {
    this.getAllOrders();
  }
  getAllOrders() {
    this.serviceOrder.getAllOrders()?.subscribe({
      next: (data: any) => {
        console.log('Orders fetched successfully:', data);
        this.orders = data.orders;
        this.applyStatusFilter();
        console.log('Orders:', this.orders);
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        return throwError(() => new Error('Error fetching orders'));
      }
    });
  }

  applyStatusFilter() {
    if (!this.statusFilter) {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(order => order.status === this.statusFilter);
    }
  }

  onStatusFilterChange(event : any) {
    this.statusFilter = event.target.value; 
    this.applyStatusFilter();
  }


  patchOrderconfirmed(orderId: string) {
    if (!orderId) {
      console.error('Order ID is required');
      return;
    }
    const status = 'confirmed'; 
   this.serviceOrder.patchOrder(orderId , status)?.subscribe({
      next: (response) => {
        this.getAllOrders();
        console.log(`Order with ID ${orderId} patched successfully`, response);
        this.toastService.showSuccess(`Order with ID ${orderId} patched successfully`);
      }
      , error: (error) => {
        console.error(`Error patching order with ID ${orderId}:`, error);
        return throwError(() => new Error(`Error patching order with ID ${orderId}`));
        this.toastService.showError(`Error patching order with ID ${orderId}: ` + error.message);
      }
    });
  }

   patchOrdercancel(orderId: string) {
    if (!orderId) {
      console.error('Order ID is required');
      return;
    }
    const status = 'canceled'; 
   this.serviceOrder.patchOrder(orderId , status)?.subscribe({
      next: (response) => {
        this.getAllOrders();
        console.log(`Order with ID ${orderId} patched successfully`, response);
        this.toastService.showSuccess(`Order with ID ${orderId} patched successfully`);
      }
      , error: (error) => {
        console.error(`Error patching order with ID ${orderId}:`, error);
        this.toastService.showError(`Error patching order with ID ${orderId}: ` + error.message);
        return throwError(() => new Error(`Error patching order with ID ${orderId}`));

      }
    });
  }



  patchOrdershipped(orderId: string) {
    if (!orderId) {
      console.error('Order ID is required');
      return;
    }
    const status = 'shipped'; 
   this.serviceOrder.patchOrder(orderId , status)?.subscribe({
      next: (response) => {
        this.getAllOrders();
        console.log(`Order with ID ${orderId} patched successfully`, response);
        this.toastService.showSuccess(`Order with ID ${orderId} patched successfully`);
      }
      , error: (error) => {
        console.error(`Error patching order with ID ${orderId}:`, error);
        this.toastService.showError(`Error patching order with ID ${orderId}: ` + error.message);
        return throwError(() => new Error(`Error patching order with ID ${orderId}`));
      }
    });
  }

    patchOrderdelivered(orderId: string) {
    if (!orderId) {
      console.error('Order ID is required');
      return;
    }
    const status = 'delivered'; 
   this.serviceOrder.patchOrder(orderId , status)?.subscribe({
      next: (response) => {
        this.getAllOrders();
        console.log(`Order with ID ${orderId} patched successfully`, response);
        this.toastService.showSuccess(`Order with ID ${orderId} patched successfully`);
      }
      , error: (error) => {
        console.error(`Error patching order with ID ${orderId}:`, error);
        this.toastService.showError(`Error patching order with ID ${orderId}: ` + error.message);
        return throwError(() => new Error(`Error patching order with ID ${orderId}`));
      }
    });
  }

   patchOrderpending(orderId: string) {
    if (!orderId) {
      console.error('Order ID is required');
      return;
    }
    const status = 'pending'; 
   this.serviceOrder.patchOrder(orderId , status)?.subscribe({
      next: (response) => {
        this.getAllOrders();
        console.log(`Order with ID ${orderId} patched successfully`, response);
        this.toastService.showSuccess(`Order with ID ${orderId} patched successfully`);
      }
      , error: (error) => {
        console.error(`Error patching order with ID ${orderId}:`, error);
        return throwError(() => new Error(`Error patching order with ID ${orderId}`));
      }
    });
  }




}
