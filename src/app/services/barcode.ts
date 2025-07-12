import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// אפשר להגדיר פה את המבנה שה-API מחזיר
export interface Product {
  name: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root' // זה הופך את השירות ל-Singleton בכל האפליקציה
})
export class BarcodeService {
  constructor(private http: HttpClient) {}

  getProductByBarcode(barcode: string): Observable<Product> {
    // החליפי כאן ל-URL של ה-API שלך
    return this.http.get<Product>(`https://your-api.com/products/${barcode}`);
  }
}
