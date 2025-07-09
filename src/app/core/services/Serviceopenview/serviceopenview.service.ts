import { inject, Injectable } from '@angular/core';
import { ServiceApiService } from '../ServiceApi/service-api.service';
import { catchError, throwError } from 'rxjs';
import { isTokenValid } from '../../../../environments/Token';

@Injectable({
  providedIn: 'root'
})
export class ServiceopenviewService {
  serviceapi = inject(ServiceApiService);
  token = '';

  // Method to get all open views
  getAllOpenViews() {
    return this.serviceapi.getRequest('/dismoin');
  }

  // Method to all open views
  getOpenView() {
    if(!isTokenValid()) {
      console.error('Token is invalid or expired');
      return throwError(() => new Error('Token is invalid or expired'));
    }
    this.token = localStorage.getItem('token') || '';
    return this.serviceapi.getRequestWithHeaders('/dismoin/all', this.token).pipe(
      catchError((error: any) => {
        console.error('Error fetching open views:', error);
        return throwError(() => new Error('Failed to fetch open views'));
      })
    );
  }

  // Method to create a new open view
  createOpenView(data: any) {
    if(!isTokenValid()) {
      console.error('Token is invalid or expired');
      return throwError(() => new Error('Token is invalid or expired'));
    }
    this.token = localStorage.getItem('token') || '';
    return this.serviceapi.postRequestWithHeaders('/dismoin', data, this.token).pipe(
      catchError((error: any) => {
        console.error('Error creating open view:', error);
        return throwError(() => new Error('Failed to create open view'));
      })
    );
  }

  // Method approving an open view
  approveOpenView(id: string) {
    if(!isTokenValid()) {
      console.error('Token is invalid or expired');
      return throwError(() => new Error('Token is invalid or expired'));
    }
    this.token = localStorage.getItem('token') || '';
    return this.serviceapi.patchRequestWithHeaders(`/dismoin/approve`, {}, this.token , id).pipe(
      catchError((error: any) => {
        console.error('Error approving open view:', error);
        return throwError(() => new Error('Failed to approve open view'));
      })
    );
  }
}
