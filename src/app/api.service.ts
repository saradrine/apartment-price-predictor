import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:5000';  // Replace with your Flask API URL

  constructor(private http: HttpClient) {}

  predictPrice(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }
}
