import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AdminRegistrationComponent } from './components/admin-registration/admin-registration.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateCategoriesComponent } from './components/create-categories/create-categories.component';
import { GetProductsComponent } from './components/get-products/get-products.component';
import { UpdateStockComponent } from './components/update-stock/update-stock.component';
import { CreateSuppliersComponent } from './components/create-suppliers/create-suppliers.component';
import { RequestStockComponent } from './components/request-stock/request-stock.component';
import { TrackGoodsComponent } from './components/track-goods/track-goods.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewSuppliersComponent } from './components/view-suppliers/view-suppliers.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminCreateEmpComponent } from './components/admin-create-emp/admin-create-emp.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { OrderSuccessModalComponent } from './components/order-success-modal/order-success-modal.component';
import { CustomErrorComponent } from './components/custom-error/custom-error.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminRegistrationComponent,
    AdminLoginComponent,
    DashboardComponent,
    CreateCategoriesComponent,
    GetProductsComponent,
    UpdateStockComponent,
    CreateSuppliersComponent,
    RequestStockComponent,
    TrackGoodsComponent,
    CreateProductComponent,
    ViewSuppliersComponent,
    ViewOrdersComponent,
    AdminCreateEmpComponent,
    ProductManagementComponent,
    CustomerOrdersComponent,
    OrderSuccessModalComponent,
    CustomErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
