import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { companyDashboardGuard, ownerDashboardGuard, UserAuthGuard } from '../../Gurds/Admin.Dashboard';
import { CanMatch } from '@angular/router';


import { DashboardLayoutComponent } from './dashboard-layout.component';
import { UsersComponent } from '../users/users.component';
import { ProductsComponent } from '../products/products.component';
import { ProductsPanelComponent } from '../products-panel/products-panel.component';
import { CategoryBrandComponent } from '../category-brand/category-brand.component';
import { CategoryBrandOwnerComponent } from '../category-brand-owner/category-brand-owner.component';
import { NotficationComponent } from '../notfication/notfication.component';
import { LogerUserComponent } from '../loger-user/loger-user.component';
import { OpenviewownerComponent } from '../openviewowner/openviewowner.component';
import { OrderownerComponent } from '../orderowner/orderowner.component';
import { CompanyComponent } from '../company/company.component';
import { RegisterComponent } from '../../Authantication/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      // { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'users', component: UsersComponent , canMatch: [ownerDashboardGuard] },
      { path: 'productmanegmentowner', component: ProductsComponent , canMatch: [ownerDashboardGuard] },
      { path: 'productmanegmentadmin', component:ProductsPanelComponent  , canMatch: [companyDashboardGuard] },
      {path: 'categorybrand', component: CategoryBrandComponent , canMatch: [companyDashboardGuard] },
      {path: 'categorybrandowner', component: CategoryBrandOwnerComponent , canMatch: [ownerDashboardGuard] },
      {path: 'logs' , component: LogerUserComponent , canMatch:[ownerDashboardGuard] },
      {path: 'openviewowner' , component: OpenviewownerComponent , canMatch:[ownerDashboardGuard] },
      {path: 'orderowner' , component: OrderownerComponent , canMatch:[ownerDashboardGuard] },
      {path: 'company' , component: CompanyComponent , canMatch:[ownerDashboardGuard] },
      {path: 'register', component: RegisterComponent , canMatch:[ownerDashboardGuard] },




      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashbordRoutingModule { }
