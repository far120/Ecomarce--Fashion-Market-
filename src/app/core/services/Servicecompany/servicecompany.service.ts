import { inject, Injectable } from '@angular/core';
import { ServiceApiService } from '../ServiceApi/service-api.service';
import { ICompany } from '../../models/model';
import { isTokenValid } from '../../../../environments/Token';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicecompanyService {

 
  apiserver = inject(ServiceApiService)
  token = '';
  
  // Get all companies
  getAllCompanies() {
    if(!isTokenValid()){
      console.error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    return this.apiserver.getRequestWithHeaders<ICompany[]>('/companies', this.token).pipe(
      catchError((error) => {
        console.error('Error fetching companies:', error);
        throw error; // Rethrow the error for further handling if needed
      }
    ));

  }

  createCompany(company: ICompany) {
    if(!isTokenValid()){
      console.error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    return this.apiserver.postRequestWithHeaders<ICompany>('/companies', company, this.token).pipe(
      catchError((error) => {
        console.error('Error creating company:', error);
        throw error; // Rethrow the error for further handling if needed
      })
    );
  }

  patchCompany(companyId: string,) {
    if(!isTokenValid()){
      console.error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    return this.apiserver.patchRequestWithHeaders<ICompany>(`/companies`, {}, this.token,`${companyId}/toggle`).pipe(
      catchError((error) => {
        console.error('Error patching company:', error);
        throw error; // Rethrow the error for further handling if needed
      })
    );
  }

}
