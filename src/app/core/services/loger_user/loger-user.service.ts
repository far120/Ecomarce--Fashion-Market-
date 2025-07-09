import { inject, Injectable } from '@angular/core';
import { ServiceApiService } from '../ServiceApi/service-api.service';
import { isTokenValid } from '../../../../environments/Token';
import { ILogs } from '../../models/model';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogerUserService {

  serviceapi = inject(ServiceApiService);
  private token = '';

  // Method to log user activity
  logUserActivity() {
    if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    return this.serviceapi.getRequestWithHeaders<ILogs[]>('/activitylogs', this.token).pipe(
      catchError((error) => {
        console.error('Error fetching user logs:', error);
        throw error;
      })
    );

  }

  // Method to get logs by user ID
  getLogsByUserId(userId: string) {
    if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    return this.serviceapi.getRequestWithHeaders<ILogs[]>(`/activitylogs/${userId}`, this.token).pipe(
      catchError((error) => {
        console.error(`Error fetching logs for user ID ${userId}:`, error);
        throw error;
      })
    );
  }

  
}
