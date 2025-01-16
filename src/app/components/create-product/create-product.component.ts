import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  adminId: number = 0;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  product = {
    name: '',
    description: '',
    image: '',
    price: 0,
    brand: '',
    userId: this.adminId,
    createdDate: new Date().toISOString()
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    const storedAdminId = sessionStorage.getItem('adminId');
    this.adminId = storedAdminId ? Number(storedAdminId) : 0;
  }

  createProduct() {
    if (this.selectedFile) {
      this.fileUploadService.upload(this.selectedFile).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.Response) {
            this.product.image = event.body.filePath; // Assuming the server returns the file path
            this.submitProduct();
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
    this.http.post('http://localhost:5269/api/Products/add-hashproducts', this.product, { responseType: 'text' })
      .subscribe({
        next: (response: any) => {
          try {
            const parsedResponse = JSON.parse(response);
            alert(JSON.stringify(parsedResponse));
          } catch (e) {
            alert(response);
          }
          this.resetForm();
        },
        error: (error) => {
          console.log(error);
          alert(error);
        }
      });
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

  resetForm() {
    this.product = {
      name: '',
      description: '',
      image: '',
      price: 0,
      brand: '',
      userId: this.adminId,
      createdDate: new Date().toISOString()
    };
    this.imagePreview = null;
    this.selectedFile = null;
  }

  formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
