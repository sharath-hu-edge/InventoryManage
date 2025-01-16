
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5269/api/Products'; // Update with your actual API URL

  constructor(private http: HttpClient) { }

  createOrder(order: Order): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/stock-request`, order);
  }

  getOrders(userId:number,orderId?: number, createdDate?: string, userName?: string): Observable<Order[]> {
    let params: any = {};
    if (userId) params.userId = userId;
    if (orderId) params.orderId = orderId;
    if (createdDate) params.createdDate = createdDate;
    if (userName) params.userName = userName;

    return this.http.get<Order[]>(`${this.apiUrl}/get-orders`, { params });
  }
  getCustomerOrders(userId:number,orderId?: number, createdDate?: string, userName?: string): Observable<Order[]> {
    let params: any = {};
    if (userId) params.userId = userId;
    if (orderId) params.orderId = orderId;
    if (createdDate) params.createdDate = createdDate;
    if (userName) params.supplierName = userName;

    return this.http.get<Order[]>(`${this.apiUrl}/get-customerorders`, { params });
  }
  cancelOrder(orderId: number, statusId: number): Observable<any> {
    const url = `${this.apiUrl}/cancel-order/${orderId}`;
    const body = { statusId};
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    

    return this.http.put(url, body);
  }
}
