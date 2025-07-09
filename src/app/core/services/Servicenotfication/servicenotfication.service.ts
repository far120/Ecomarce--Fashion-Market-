import { inject, Injectable } from '@angular/core';
import { ServiceApiService } from '../ServiceApi/service-api.service';
import { isTokenValid } from '../../../../environments/Token';

@Injectable({
  providedIn: 'root'
})
export class ServicenotficationService {

  apiservice = inject(ServiceApiService);
  token = '';

  // Method to get all notifications
  getAllNotifications() {
    if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    return this.apiservice.getRequestWithHeaders('/notifications', this.token);
  }

  
}
