import { Component, OnInit, Renderer2 } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order.model';
import { Item } from 'src/app/models/item.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import jsPDF from 'jspdf';
import 'bootstrap';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  orders: Order[] = [];
  orderId?: number;
  createdDate?: string;
  supplierName?: string;
  expandedRow: number | null = null;
  printOrderData: any = null;

  adminId: number = 0;

  

  constructor(private orderService: OrderService,
     private renderer: Renderer2,
      private http: HttpClient,
      private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    const storedAdminId = sessionStorage.getItem('adminId');
    this.adminId = storedAdminId ? Number(storedAdminId) : 0;
    this.getOrders();

  }

  getOrders(): void {
    this.orderService.getOrders(this.adminId,this.orderId, this.createdDate).subscribe({
      next: (data: Order[]) => this.orders = data,
      error: (error) => {
        console.log(error);
        alert(error);
      }
    });
  }

  

  print(order: any) {
    console.log('Starting printOrder function');
    this.printOrderData = order;
  
    const printContent = document.getElementById('printSection');
    if (printContent) {
      console.log('Print section found:', printContent);
  
      const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
      if (WindowPrt) {
        console.log('Print window opened successfully');
  
        this.renderer.setStyle(printContent, 'display', 'block');
        console.log('Print content set to display block');
  
        WindowPrt.document.write('<html><head><title>Print Order</title>');
        WindowPrt.document.write('<style>.invoice { font-family: Arial, sans-serif; }</style>');
        WindowPrt.document.write('</head><body>');
        WindowPrt.document.write(printContent.innerHTML);
        WindowPrt.document.write('</body></html>');
        WindowPrt.document.close();
        WindowPrt.focus();
        WindowPrt.print();
        WindowPrt.close();
  
        console.log('Print window closed');
        this.renderer.setStyle(printContent, 'display', 'none');
      } else {
        console.error('Failed to open print window');
      }
    } else {
      console.error('Print section not found');
    }
  }
  
  downloadOrder(order: Order) {
    const doc = new jsPDF();

    doc.text(`Order ID: ${order.orderId}`, 10, 10);
    doc.text(`Order Name: ${order.productName}`, 10, 20);
    doc.text(`Supplier Name: ${order.productName}`, 10, 30);
    doc.text(`Supplier Email: ${order.mobileNumber}`, 10, 40);
    doc.text(`Status: ${order.orderStatus}`, 10, 50);
    doc.text(`Total Price: ${order.totalPrice}`, 10, 60);
    doc.text(`Order Date: ${order.createdDate}`, 10, 70);
    doc.text('Items:', 10, 80);

    let yPosition = 90; 
    doc.save(`Order_${order.orderId}.pdf`);
  }
  
  cancelOrder(orderId: number): void {
    const statusId = 0; // Static value for statusId
    const status = 'Cancelled'; // Static value for status

    this.orderService.cancelOrder(orderId, statusId).subscribe({
      next: (response) => {
       // alert('Order cancelled successfully.');
        this.snackBar.open('Order cancelled successfully.', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        this.getOrders();
      },
      error: (error) => {
        this.snackBar.open(error, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
       // console.error('Error cancelling order:', error);
      }
    });
  }
  
  clearInput() {
    this.orderId = 0; // Reset to default value
    this.createdDate = ''; // Reset to default value
    this.getOrders(); // Optionally, you can call getOrders to refresh the list
  }
}
