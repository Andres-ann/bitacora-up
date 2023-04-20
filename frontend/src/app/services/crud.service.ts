import { Injectable } from '@angular/core';
import { Frases } from '../models/frases.model';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private REST_API: string = 'http://localhost:8000/api/products';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  getFrases(): Observable<any> {
    return this.httpClient.get(this.REST_API, { headers: this.httpHeaders });
  }

  getFrase(id: any): Observable<any> {
    return this.httpClient
      .get(`${this.REST_API}/${id}`, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => {
          return res || {};
        })
      );
  }

  createFrase(data: Frases): Observable<any> {
    return this.httpClient
      .post(this.REST_API, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  updateFrase(id: any, data: any): Observable<any> {
    return this.httpClient
      .put(`${this.REST_API}/${id}`, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  deleteFrase(id: any): Observable<any> {
    return this.httpClient
      .delete(`${this.REST_API}/${id}`, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMsg: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    } else {
      errorMsg = `Error code: ${error.status}. Message: ${error.message}`;
    }
    return throwError(() => {
      errorMsg;
    });
  }
}
