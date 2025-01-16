// src/app/error-handler.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private router: Router) {}

  handleError(error: any): void {
    console.error('An error occurred:', error);
    this.router.navigate(['/error']);
  }
}
