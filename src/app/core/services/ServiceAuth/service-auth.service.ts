import { inject, Injectable } from '@angular/core';
import { ServiceApiService } from '../ServiceApi/service-api.service';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ILoginUser } from '../../models/model';
import { IRegisterUser } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuthService {

  ServiseApi = inject(ServiceApiService);

  // Method to login user
  loginUser(data: ILoginUser): Observable<any> {
    return this.ServiseApi.postRequest('/users/login', data);
  }

  // Method to register user
  registerUser(data: IRegisterUser): Observable<any> {
    return this.ServiseApi.postRequest('/users/register', data);
  }

  // Method to register user with file upload (FormData)
  registerUserWithFile(formData: FormData): Observable<any> {
    return this.ServiseApi.postRequestFormData('/users/register', formData);
  }

  
}
