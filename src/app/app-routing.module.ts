import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminRegistrationComponent } from './components/admin-registration/admin-registration.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateCategoriesComponent } from './components/create-categories/create-categories.component';
import { GetProductsComponent } from './components/get-products/get-products.component';
import { UpdateStockComponent } from './components/update-stock/update-stock.component';
import { CreateSuppliersComponent } from './components/create-suppliers/create-suppliers.component';
import { RequestStockComponent } from './components/request-stock/request-stock.component';
import { TrackGoodsComponent } from './components/track-goods/track-goods.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ViewSuppliersComponent } from './components/view-suppliers/view-suppliers.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { inject } from '@angular/core';
import { AdminCreateEmpComponent } from './components/admin-create-emp/admin-create-emp.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { CustomerOrdersComponent } from './components/customer-orders/customer-orders.component';
import { CustomErrorComponent } from './components/custom-error/custom-error.component';

const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full'},
  { path: 'register', component: AdminRegistrationComponent},
  { path: 'login', component: AdminLoginComponent},


  { path: 'dashboard',
     component: DashboardComponent,
     canActivate:[
      () => {
        const authService = inject(AuthService);
        const router = inject(Router);
        if(!authService.isLoggedIn()){
          router.navigate(['/login']);
          return false;
        }
        return true;
      }
     ],
     children: [
      { path: '', redirectTo: 'get-products', pathMatch: 'full' },
      { path: 'create-category', component: CreateCategoriesComponent},
      { path: 'create-supplier', component: CreateSuppliersComponent},
      { path: 'view-suppliers', component: ViewSuppliersComponent},
      { path: 'update-stock', component: UpdateStockComponent},
      { path: 'track-expiry', component: TrackGoodsComponent},
      { path: 'request-stock', component: RequestStockComponent},
      { path: 'get-products', component: GetProductsComponent},
      { path: 'create-product', component: CreateProductComponent},
      { path: 'get-orders', component: ViewOrdersComponent},
      { path: 'create-emp', component: AdminCreateEmpComponent},
      { path: 'manage-product', component: ProductManagementComponent},
      { path: 'customer-orders', component: CustomerOrdersComponent},



     ]
    },
  { path: 'error', component: CustomErrorComponent },
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
