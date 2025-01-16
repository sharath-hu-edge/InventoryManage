import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: 'sha',
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]) ,
      passwordHash: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)[^\s]{8,}$/)])
    });
  }

  loginAdmin() {
    if (this.loginForm.valid) {
      this.http.post('http://localhost:5269/api/Admin/login', this.loginForm.value).subscribe({
        next: (response: any) => {
          const token = response.Token;
          this.authService.login(token);
          sessionStorage.setItem('adminId', response.adminId);
          sessionStorage.setItem('isSuperUser', response.isSuperUser);
          sessionStorage.setItem('userName', response.userName);


          this.router.navigate(['/dashboard/get-products']);
        },
        error: (error) => {          
          this.snackBar.open('Invalid Credentials', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        },
        complete: () => {
          console.log('Login request completed');
        }
      });
    }
    else{
      alert('Please fill in the form correctly.');
    }
  }
}
