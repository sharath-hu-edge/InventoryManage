// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggdIn = false;

  constructor(private router: Router) {}

  isLoggedIn(): boolean{
    return this.loggdIn;
  }

  login(): void {
    this.loggdIn = true;
  }

  logout(): void {
    this.loggdIn = false;
  }

  
}
