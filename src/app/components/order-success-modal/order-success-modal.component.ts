import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-success-modal',
  templateUrl: './order-success-modal.component.html',
  styleUrls: ['./order-success-modal.component.css']
})
export class OrderSuccessModalComponent {
  constructor(public dialogRef: MatDialogRef<OrderSuccessModalComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
