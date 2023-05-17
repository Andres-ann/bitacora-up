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
export class SearchService {
  private REST_API: string = 'http://localhost:8000/api/search';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  searchCollection(query: string): Observable<any> {
    return this.httpClient
      .get(`${this.REST_API}/?query=${query}`, { headers: this.httpHeaders })
      .pipe(
        map((res: any) => res),
        catchError(this.handleError) // Agrega esta línea para manejar los errores
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg: string;
    if (error.error instanceof ErrorEvent) {
      errorMsg = error.error.message;
    } else {
      errorMsg = `Error code: ${error.status}. Message: ${error.message}`;
    }
    return throwError(errorMsg);
  }
}
