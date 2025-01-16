import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier.model';
import { Variant } from '../models/varient.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'http://localhost:5269/api/Products';

  constructor(private http: HttpClient) { }

  getSuppliers(search?: string): Observable<Supplier[]> {
    let url = `${this.apiUrl}/get-suppliers`;
    if (search) {
      url += `?search=${search}`;
    }
    return this.http.get<Supplier[]>(url);
  }

  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-supplier/${id}`);
  }

  createSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.apiUrl}/create-supplier`, supplier);
  }

  getVariants(endDate?: string): Observable<Variant[]> {
    let url = `${this.apiUrl}/get-expirygoods`;
    if (endDate) {
      url += `?endDate=${endDate}`;
    }
    return this.http.get<Variant[]>(url);
  }
}