import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl =
    'https://tunisianappartmentpriceestimator.onrender.com/predict'; // Replace with your Flask API URL

  constructor(private http: HttpClient) {}

  predictPrice(data: any): Observable<any> {
    return this.http.post(this.apiUrl, { input: data });
  }
}
