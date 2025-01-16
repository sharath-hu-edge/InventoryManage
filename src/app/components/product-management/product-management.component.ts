import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  productForm!: FormGroup;

  products: any[] = [];
  productName: string = '';
  expandedRow: number | null = null;
  selectedCategory: string = '';
  sortOption: string = 'name';
  categories: string[] = ['Category1', 'Category2', 'Category3'];
  showProductList: boolean = true;
  isEditMode: boolean = false;

  adminId: number = 0;
  sellerName: string | null = null;

  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  product = {
    id: null,
    name: '',
    description: '',
    image: '',
    price: 0,
    brand: '',
    ststus:0,
    userId: this.adminId,
    sellerName:this.sellerName,
    createdDate: new Date().toISOString()
  };

  private baseUrl = 'http://localhost:5269/api/Products';

  constructor(private http: HttpClient,
      private snackBar: MatSnackBar,
      private fileUploadService: FileUploadService,
      private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    const storedAdminId = sessionStorage.getItem('adminId');
    this.adminId = storedAdminId ? Number(storedAdminId) : 0;
    const user = sessionStorage.getItem('userName');
    this.sellerName = user ? String(user) : null;
    this.fetchProducts();

    this.productForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]{4,}$/)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9 ]{4,}$/)
      ]),
      brand: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]{4,}$/)
      ]),
      price: new FormControl('', [
        Validators.required
      ]),
      productId: ['']
    });
  }

  fetchProducts(): void {
    let params = new HttpParams();

    params = params.set('userId', this.adminId);

    if (this.productName.trim()) {
      params = params.set('productName', this.productName.trim());
    }
    if (this.sortOption.trim()){
      params = params.set('sortBy', this.sortOption.trim());
    }

    this.http.get<any[]>(`${this.baseUrl}/getmyproducts`, { params }).subscribe({
      next: (response) => {
        this.products = response;
        this.applyFiltersAndSort();
      },
      error: (err) => console.error(err),
    });
  }

  applyFiltersAndSort(): void {
    let filteredProducts = this.products.filter(product =>
      (this.productName === '' || product.name.toLowerCase().includes(this.productName.toLowerCase()) || product.category.toLowerCase().includes(this.productName.toLowerCase())) &&
      (this.selectedCategory === '' || product.category === this.selectedCategory)
    );

    filteredProducts = filteredProducts.sort((a, b) => {
      if (this.sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (this.sortOption === 'price') {
        return a.price - b.price;
      } else if (this.sortOption === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });

    this.products = filteredProducts;
  }

  orderNow(product: any): void {
    console.log('Order now for product:', product);
  }

  showCreateProductForm(){
    this.showProductList = false;
    this.isEditMode = false;
    this.resetForm();
  }

  showProductListView(): void {
    this.showProductList = true;
    this.fetchProducts(); 
  }

  createProduct() {
    if (this.selectedFile) {
      this.fileUploadService.upload(this.selectedFile).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.Response) {
            this.product.image = event.body.filePath; // Assuming the server returns the file path
            this.submitProduct();   
            this.fetchProducts();        
          }
        },
        error: (error) => {
          console.log(error);
          alert(error);
        }
      });
    } else {
      this.submitProduct();
    }
  }

  submitProduct() {
    if(this.productForm.valid){     
      this.product.name = this.productForm.value.name;
      this.product.description = this.productForm.value.description;
      this.product.brand = this.productForm.value.brand;
      this.product.price = this.productForm.value.price;
      this.product.sellerName = this.sellerName;


      this.http.post('http://localhost:5269/api/Products/add-hashproducts', this.product, { responseType: 'text' })
      .subscribe({
        next: (response: any) => {
          try {
            const parsedResponse = JSON.parse(response);
            //alert(JSON.stringify(parsedResponse));

            this.snackBar.open(JSON.stringify(parsedResponse), 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
            this.showProductListView();
            this.fetchProducts();
          } catch (e) {
            //alert(response);
            this.snackBar.open(JSON.stringify(response), 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
          }
          this.resetForm();
        },
        error: (error) => {
          console.log(error);
          alert(error);
        }
      });

    }else{
      this.snackBar.open('Please fill out the form correctly.', 'Close', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
    }
    
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  resetForm(){
    this.product = {
      id: null,
      name: '',
      description: '',
      image: '',
      price: 0,
      brand: '',
      ststus:0,
      userId: this.adminId,
      sellerName: '',
      createdDate: new Date().toISOString()
    };
    this.imagePreview = null;
    this.selectedFile = null;

    this.productForm.reset({
      name: '',
      description: '',
      brand: '',
      price: ''
    });
  }

  editProduct(product: any): void {
    this.showCreateProductForm();
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      brand: product.brand,
      price: product.price,
      productId: product.productId
    });
    this.imagePreview = product.image;
    this.isEditMode = true;   
  }

  deleteProduct(product: any): void {       
    
    this.productForm.patchValue({
      productId: product.productId
    });
    this.product.id = this.productForm.value.productId;

      this.http.delete(`${this.baseUrl}/deleteproduct/${this.product.id}`).subscribe({
        next: () => {
          this.snackBar.open('Successfully Deleted.', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          this.fetchProducts();
        },
        error: (error) => {
          console.log(error);         
          this.snackBar.open(error, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
        }
      });
    
  }

  updateprodfirst(){
    if (this.selectedFile) {
      this.fileUploadService.upload(this.selectedFile).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.Response) {
            this.product.image = event.body.filePath; // Assuming the server returns the file path  
            this.updateProduct();         
          }
        },
        error: (error) => {
          console.log(error);
          alert(error);
        }
      });
    }else{
      if (typeof this.imagePreview === 'string') {
        this.product.image = this.imagePreview;
        this.updateProduct();  
      } else {       
        this.snackBar.open('Invalid imagePreview type', 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
      }
    }

  }

  updateProduct() {
    this.product.name = this.productForm.value.name;
    this.product.description = this.productForm.value.description;
    this.product.brand = this.productForm.value.brand;
    this.product.price = this.productForm.value.price;
    this.product.id = this.productForm.value.productId;
    this.product.sellerName = this.sellerName;

    // Assuming you have an endpoint to update the product
    this.http.put(`${this.baseUrl}/updateproduct/${this.product.id}`, this.product)
      .subscribe({
        next: (response: any) => {
         // alert('Product updated successfully');
          this.snackBar.open('Product updated successfully.', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          this.resetForm();
          this.showProductListView();
          this.fetchProducts();
        },
        error: (error) => {
          console.log(error);
          //alert(error);
          this.snackBar.open(error, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
        }
      });
  }

  updateStatus(status: number,product:any): void{
    this.productForm.patchValue({
      productId: product.productId
    });
    this.product.id = this.productForm.value.productId;

    // Assuming you have an endpoint to update the product
    this.http.put(`${this.baseUrl}/updatestatus/${this.product.id}`, status)
      .subscribe({
        next: (response: any) => {
         // alert('Product updated successfully');
          this.snackBar.open('Product updated successfully.', 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          this.resetForm();
          this.showProductListView();
          this.fetchProducts();
        },
        error: (error) => {
          console.log(error);
          //alert(error);
          this.snackBar.open(error, 'Close', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
        }
      });
    
  }
  onSortChange(): void {
    this.fetchProducts();
  }
}
