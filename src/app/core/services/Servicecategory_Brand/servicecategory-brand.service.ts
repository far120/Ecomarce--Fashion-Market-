import { inject, Injectable } from '@angular/core';
import { ServiceApiService } from '../ServiceApi/service-api.service';
import { isTokenValid } from '../../../../environments/Token';
import { ICategory } from '../../models/model';
import { IBrand } from '../../models/model';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicecategoryBrandService {

  
  apiserves = inject(ServiceApiService)
  token = "";

  // post Category 
  postcategory(categories: ICategory | FormData) {
 if (!isTokenValid()) {
    throw new Error('Token is invalid or expired');
  }
  this.token = localStorage.getItem('token') || '';
  return this.apiserves.postRequestWithHeaders("/categories", categories , this.token).pipe(
    catchError(error=>{
       console.error('Error creating category:', error);
      throw error;
    })
  )
  }

  patchctegory(categoryId : string){
    if (!isTokenValid()) {
    throw new Error('Token is invalid or expired');
  }
  this.token = localStorage.getItem('token') || '';
  return this.apiserves.patchRequestWithHeaders("/categories" , {} , this.token , `${categoryId}/approve`).pipe(
    catchError(erorr =>{
      console.log(erorr)
      throw erorr;
    })
  )
  }

  postbrand(brand: IBrand | FormData) {
    if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    return this.apiserves.postRequestWithHeaders("/brands/suggest_brands", brand , this.token).pipe(
      catchError(error=>{
        console.error('Error creating brand:', error);
        throw error;
      })
    )
  }
  patchbrand(brandId : string){
    if (!isTokenValid()) {
      throw new Error('Token is invalid or expired');
    }
    this.token = localStorage.getItem('token') || '';
    return this.apiserves.patchRequestWithHeaders("/brands" , {} , this.token , `${brandId}/approve`).pipe(
      catchError(erorr =>{
        console.log(erorr)
        throw erorr;
      })
    )
  }

 
  



}
