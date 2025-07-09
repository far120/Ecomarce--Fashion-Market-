import { Component } from '@angular/core';
import { ServiceorderService } from '../../core/services/Serviceorder/serviceorder.service';
import { IOrder } from '../../core/models/model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  orders: IOrder[] = [];
  constructor(private serviceOrder: ServiceorderService) {
    this.getAllOrders();
  }
  getAllOrders() {
    this.serviceOrder.getAllOrders()?.subscribe({
      next: (data: any) => {
        console.log('Orders fetched successfully:', data);
        this.orders = data.orders;
        console.log('Orders:', this.orders);
      }
      , error: (error) => {
        console.error('Error fetching orders:', error);
        return throwError(() => new Error('Error fetching orders'));
      }
    });
  }


}
