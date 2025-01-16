import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-create-emp',
  templateUrl: './admin-create-emp.component.html',
  styleUrls: ['./admin-create-emp.component.css']
})
export class AdminCreateEmpComponent implements OnInit {
  registerForm!: FormGroup;
  employees: any[] = [];
  showForm = false;
  searchTerm: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]{4,}$/)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      isSuperAdmin: new FormControl(0),
      joiningDate: new Date().toISOString()
    });

    this.fetchEmployees();
  }

  fetchEmployees() {
    this.http.get<any[]>('http://localhost:5269/api/Admin/getEmployees')
      .subscribe({
        next: (response) => {
          this.employees = response;
        },
        error: (error) => {
          this.snackBar.open('Failed to fetch employees.', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
        }
      });
  }

  registerAdmin() {
    if (this.registerForm.valid) {
      const empData = this.registerForm.value; // Extract form values

      this.http.post('http://localhost:5269/api/Admin/createHasher', empData)
        .subscribe({
          next: (response: any) => {
            this.snackBar.open(response.message, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
            this.registerForm.reset();
            this.showForm = false; // Hide the form after successful registration
            this.fetchEmployees(); // Refresh the employee list
          },
          error: (error) => {
            this.snackBar.open(error.error.message, 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
          },
          complete: () => {
            console.log('Registration Completed.');
          }
        });
    } else {
      this.snackBar.open('Please fill out the form correctly.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
  }

  filteredEmployees() {
    if (!this.searchTerm) {
      return this.employees;
    }
    return this.employees.filter(employee =>
      employee.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
