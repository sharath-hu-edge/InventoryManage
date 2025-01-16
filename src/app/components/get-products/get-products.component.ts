import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorHandlerService } from 'src/app/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.css']
})
export class GetProductsComponent implements OnInit {

  orderForm!: FormGroup;

  products: any[] = [];
  productName: string = '';
  expandedRow: number | null = null;

  adminId: number = 0;
  isSuperUser: number | null = null;
  userName: string| null = null;

  selectedCategory: string = '';
  sortOption: string = ''; // Ensure this property is defined
  
  categories: string[] = ['Category1', 'Category2', 'Category3']; // Example categories

  selectedProduct: any = null;
  quantity: number = 1;
  address: string = '';
  mobileNumber: string = '';
  paymentMode: string = 'Credit Card';
  totalPrice: number = 0;

  private baseUrl = 'http://localhost:5269/api/Products/getproducts';
  private orderUrl = 'http://localhost:5269/api/Products/placeorder';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private errorHandler: ErrorHandlerService
    ) { }

  ngOnInit(): void {
    // Retrieve adminId from session storage and convert it to a number
    const storedAdminId = sessionStorage.getItem('adminId');
    const superuser = sessionStorage.getItem('isSuperUser');

    this.adminId = storedAdminId ? Number(storedAdminId) : 0;
    this.isSuperUser = superuser ? Number(superuser) : null;

    const user = sessionStorage.getItem('userName');
    this.userName = user ? String(user) : null;

    // Fetch products after adminId is set
    this.fetchProducts();

    this.orderForm = this.fb.group({
      address: ['', [Validators.required, Validators.minLength(10)]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      countryCode: ['+91', Validators.required],
      paymentMode: ['', Validators.required]      
    });
  }

  fetchProducts(): void {
    let params = new HttpParams();

    if (this.productName.trim()) {
      params = params.set('productName', this.productName.trim());     
    }
    if (this.sortOption.trim()){
      params = params.set('sortBy', this.sortOption.trim());
    }
    this.http.get<any[]>(this.baseUrl, { params }).subscribe({
      next: (response) => {
        this.products = response;
        this.applyFiltersAndSort();
      },
      error: (err) => {       
        this.snackBar.open(err, 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
    });
  }

  applyFiltersAndSort(): void {
    // Filter products based on search and category
    let filteredProducts = this.products.filter(product =>
      (this.productName === '' || product.name.toLowerCase().includes(this.productName.toLowerCase()) || product.category.toLowerCase().includes(this.productName.toLowerCase())) &&
      (this.selectedCategory === '' || product.category === this.selectedCategory)
    );

    // Sort products based on selected option
    filteredProducts = filteredProducts.sort((a, b) => {
      if (this.sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (this.sortOption === 'price') {
        return a.price - b.price;
      } else if (this.sortOption === 'createddate') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });

    this.products = filteredProducts;
  }

  orderNow(product: any): void {
    this.selectedProduct = product;
    this.quantity = 1;
    this.calculateTotalPrice();
  }
  cancelSelection(){
    this.selectedProduct = null;
    this.fetchProducts();
  }

  calculateTotalPrice(): void {
    if (this.selectedProduct) {
      this.totalPrice = this.selectedProduct.price * this.quantity;
    }
  }

  increaseQuantity(): void {
    this.quantity++;
    this.calculateTotalPrice();
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.calculateTotalPrice();
    }
  }

  proceedToPay(): void {
    
    if (this.orderForm.valid) {
      const inputfields = this.orderForm.value;
      const mobilenum = inputfields.countryCode+' '+inputfields.mobileNumber;
      const orderDetails = {
        productId: this.selectedProduct.productId,
        sellerId: this.selectedProduct.userId,
        userId: this.adminId,
        userName: this.userName,
        productName: this.selectedProduct.name, // Ensure this is captured
        image: this.selectedProduct.image,
        price: this.selectedProduct.price, // Ensure this is captured
        quantity: this.quantity,
        address: inputfields.address,
        mobileNumber: mobilenum,
        paymentMode: inputfields.paymentMode,
        totalPrice: this.totalPrice,
        orderStatus:1,
        createdDate:new Date().toISOString()
      };
  
      this.http.post(this.orderUrl, orderDetails, { responseType: 'text' }).subscribe({
        next: (response) => {
          console.log(response);
          //alert('Order placed successfully');
          // this.snackBar.open('Order placed successfully.', 'Close', {
          //   duration: 3000,
          //   verticalPosition: 'bottom',
          //   horizontalPosition: 'center'
          // });

          this.router.navigate(['/dashboard/order-success']);
          


          this.selectedProduct = null;
          this.fetchProducts();
        },
        error: (error) => {
          console.error(error);
          //alert('Failed to place order');
          this.snackBar.open(error, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          this.errorHandler.handleError(error);
        }
      });
    }
    

  }
  onSortChange(): void {
    this.fetchProducts();
  }
  // Conceptual form validation method
  
  
}
