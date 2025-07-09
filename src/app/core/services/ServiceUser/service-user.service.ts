import { inject, Injectable } from '@angular/core';
import { IRegisterUser } from '../../models/model';
import { ServiceApiService } from '../ServiceApi/service-api.service';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { isTokenValid } from '../../../../environments/Token';
@Injectable({
  providedIn: 'root'
})
export class ServiceUSerService {


  apiservice = inject(ServiceApiService);


  private token ="";


  // get user profile
  getUserProfile(endpoint: string): Observable<IRegisterUser> {
    if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    return this.apiservice.getRequestWithHeaders<IRegisterUser>("/users/profile", this.token).pipe(
      catchError((error) => {
        console.error('Error fetching user profile:', error);
        throw error;
      })
    );
  }



// update profile
  updateProfile( userData: any): Observable<IRegisterUser> {
    if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    return this.apiservice.putRequestWithHeaders<IRegisterUser>("/users/profile", userData, this.token).pipe(
      catchError((error) => {
        console.error('Error updating profile:', error);
        throw error;
      })
    );
  }

// dashboard admin panel

  // get all users
  getallUsers(): Observable<IRegisterUser[]> {
    if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    return this.apiservice.getRequestWithHeaders<IRegisterUser[]>("/users", this.token).pipe(
      catchError((error) => {
        console.error('Error fetching all users:', error);
        throw error;
      })
    );
  }

  // delete user
  deleteUser(userId: string): Observable<IRegisterUser> {
    if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    return this.apiservice.deleteRequestWithHeaders<IRegisterUser>(`/users/${userId}`, this.token).pipe(
      catchError((error) => {
        console.error('Error deleting user:', error);
        throw error;
      })
    );
  }

// patch user approval
  patchUser(userId: string): Observable<IRegisterUser> {
    if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    return this.apiservice.patchRequestWithHeaders<IRegisterUser>(`/users`,{},  this.token , `${userId}/toggle`).pipe(
      catchError((error) => {
        console.error('Error updating user:', error);
        throw error;
      })
    );
  }

  // updateUserRole(userId: string, role: string): Observable<IRegisterUser> {
  //   if (!isTokenValid()) {
  //     throw new Error('Token is invalid or expired');
  //   }
  //   this.token = localStorage.getItem('token') || '';
  //   return this.apiservice.patchRequestWithHeaders<IRegisterUser>(`/users/${userId}/role`, { role }, this.token).pipe(
  //     catchError((error) => {
  //       console.error('Error updating user role:', error);
  //       throw error;
  //     })
  //   );
  // }



}









