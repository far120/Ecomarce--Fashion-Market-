import { Routes } from '@angular/router';
import { FrontLayoutComponent } from './front/front-layout/front-layout.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';
import { LoginComponent } from './Authantication/login/login.component';
import { RegisterComponent } from './Authantication/register/register.component';
import { UserComponent } from './front/user/user.component';
import { HomeComponent } from './front/home/home.component';
import { NotficationComponent } from './dashboard/notfication/notfication.component';
import { ProductsComponent } from './front/products/products.component';
import { CartComponent } from './front/cart/cart.component';
import { WishlistComponent } from './front/wishlist/wishlist.component';
import { AboutComponent } from './front/about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserAuthGuard, AdminDashboardGuard, AuthGuard } from './Gurds/Admin.Dashboard';
import { OpenviewComponent } from './front/openview/openview.component';
import { ProductDetailesComponent } from './front/product-detailes/product-detailes.component';
import { OrderComponent } from './front/order/order.component';
import { FAQComponent } from './faq/faq.component';




export const routes: Routes = [
    { path: '', component: FrontLayoutComponent,  children: [     
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
            { path: 'profile', component: UserComponent, canMatch: [UserAuthGuard] },
            {path: 'notfication', component: NotficationComponent, canMatch: [UserAuthGuard] },
            {path: 'products', component: ProductsComponent },
            {path: 'cart', component: CartComponent, canMatch: [UserAuthGuard] },
            {path: 'wishlist', component: WishlistComponent, canMatch: [UserAuthGuard] },
            {path: 'about', component: AboutComponent },
            {path: 'openview', component: OpenviewComponent},
            {path: 'product-details/:id', component: ProductDetailesComponent, canMatch: [UserAuthGuard] },
            {path: 'order', component: OrderComponent, canMatch: [UserAuthGuard] },
            {path: 'faq', component: FAQComponent,  }


        ]
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard-layout/dashbord-routing.module').then(m => m.DashbordRoutingModule), 
        canMatch: [AdminDashboardGuard]
    },
    { path: 'login', component: LoginComponent , canMatch: [AuthGuard]  },
    { path: 'register', component: RegisterComponent , canMatch: [AuthGuard] },
    { path: '404', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent }
];
