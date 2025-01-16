import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { Supplier } from 'src/app/models/supplier.model';

@Component({
  selector: 'app-create-suppliers',
  templateUrl: './create-suppliers.component.html',
  styleUrls: ['./create-suppliers.component.css']
})
export class CreateSuppliersComponent {
  supplier: Supplier = {
    supplierId: 0,
    name: '',
    contactInfo: '',
    email: '',
    createdDate: new Date()
  };

  constructor(private supplierService: SupplierService) { }

  createSupplier(): void {
    this.supplierService.createSupplier(this.supplier).subscribe({
      next: (data: Supplier) => {
        alert('Supplier created successfully.');
        this.resetForm();
      },
      error: (error: any) => {
        console.error('Error creating supplier', error);
        alert('Error creating supplier: ' + error.message);
      }
    });
  }

  resetForm(): void {
    this.supplier = {
      supplierId: 0,
      name: '',
      contactInfo: '',
      email: '',
      createdDate: new Date()
    };
  }
}
