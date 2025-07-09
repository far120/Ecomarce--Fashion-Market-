import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {

  http = inject(HttpClient);
  private baseUrl = environment.API_URL || '';

  // GET request with headers
  getRequestWithHeaders<T>(endpoint: string, token: string): Observable<T> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { headers }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // GET request without headers
  getRequest<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // POST request with headers
  postRequestWithHeaders<T>(endpoint: string, data: any, token: string): Observable<T> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, { headers }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // POST request without headers
  postRequest<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // POST request with FormData (for file uploads) with headers
  postRequestFormDataWithHeaders<T>(endpoint: string, formData: FormData, token: string): Observable<T> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, formData, { headers }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // POST request with FormData (for file uploads) without headers
  postRequestFormData<T>(endpoint: string, formData: FormData): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, formData).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // PUT request with headers
  putRequestWithHeaders<T>(endpoint: string, data: any, token: string, id?: string): Observable<T> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,

    });
    const url = id ? `${this.baseUrl}${endpoint}/${id}` : `${this.baseUrl}${endpoint}`;
    return this.http.put<T>(url, data, { headers }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // PUT request without headers
  putRequest<T>(endpoint: string, data: any, id?: string): Observable<T> {
    const url = id ? `${this.baseUrl}${endpoint}/${id}` : `${this.baseUrl}${endpoint}`;
    return this.http.put<T>(url, data).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // PATCH request with headers
  patchRequestWithHeaders<T>(endpoint: string, data: any, token: string, id?: string): Observable<T> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    const url = id ? `${this.baseUrl}${endpoint}/${id}` : `${this.baseUrl}${endpoint}`;
    return this.http.patch<T>(url, data, { headers }).pipe(
      catchError(error => this.handleError(error))
    );
  }
  // PATCH request without headers
  patchRequest<T>(endpoint: string, data: any, id?: string): Observable<T> {
    const url = id ? `${this.baseUrl}${endpoint}/${id}` : `${this.baseUrl}${endpoint}`;
    return this.http.patch<T>(url, data).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // DELETE request with headers
  deleteRequestWithHeaders<T>(endpoint: string, token: string, id?: string): Observable<T> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    const url = id ? `${this.baseUrl}${endpoint}/${id}` : `${this.baseUrl}${endpoint}`;
    return this.http.delete<T>(url, { headers }).pipe(
      catchError(error => this.handleError(error))
    );
  }

  // DELETE request without headers
  deleteRequest<T>(endpoint: string, id?: string): Observable<T> {
    const url = id ? `${this.baseUrl}${endpoint}/${id}` : `${this.baseUrl}${endpoint}`;
    return this.http.delete<T>(url).pipe(
      catchError(error => this.handleError(error))
    );
  }

   private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.status === 0) {
      // A client-side or network error occurred
      console.error('A client-side or network error occurred:', error.error);
      errorMessage = 'Network error. Please check your connection and try again.';
    } else if (error.status >= 400 && error.status < 500) {
      // Client error (400-499)
      console.error(`Client error ${error.status}:`, error.error);
      errorMessage = error.error?.message || `Client error: ${error.status}`;
    } else if (error.status >= 500) {
      // Server error (500+)
      console.error(`Server error ${error.status}:`, error.error);
      errorMessage = 'Server error. Please try again later.';
    } else {
      // Other errors
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
      errorMessage = error.error?.message || 'Something went wrong. Please try again.';
    }
    
    return throwError(() => new Error(errorMessage));
  }

}
