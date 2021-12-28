import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { HeaderComponent } from './components/header/header.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { LoginComponent } from './components/login/login.component';
import { ManagementComponent } from './components/management/management.component';
import { MenuComponent } from './components/menu/menu.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ReportsComponent } from './components/reports/reports.component';
import { BillsComponent } from './components/bills/bills.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { StockComponent } from './components/stock/stock.component';
import { NormsComponent } from './components/norms/norms.component';
import { RestaurantmenuComponent } from './components/restaurantmenu/restaurantmenu.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HomeComponent } from './components/home/home.component';

// const routes: Routes = [
//   {path : '', component : LoginComponent},
//   {path : 'login', component : LoginComponent},
//   {path : 'restaurant', component : RestaurantComponent},
//   {path : 'management', component : ManagementComponent},
//   {path : 'menu', component : MenuComponent},
//   {path : 'employee', component : EmployeeComponent},
//   {path : 'invoice', component : InvoiceComponent},
//   {path : 'statistic', component : StatisticsComponent},
//   {path : 'reports', component : ReportsComponent},
//   {path : 'bills', component : BillsComponent},
//   {path : 'notifications', component : NotificationsComponent},
//   {path : 'restaurantmenu', component : RestaurantmenuComponent},
//   {path : 'stocks', component : StockComponent},
//   {path : 'norms', component : NormsComponent},
//   {path : 'settings', component : SettingsComponent},
// ];

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, 
    children: [
      {path : 'restaurant', component : RestaurantComponent},
      {path : 'management', component : ManagementComponent},
      {path : 'menu', component : MenuComponent},
      {path : 'employee', component : EmployeeComponent},
      {path : 'invoice', component : InvoiceComponent},
      {path : 'statistic', component : StatisticsComponent},
      {path : 'reports', component : ReportsComponent},
      {path : 'bills', component : BillsComponent},
      {path : 'notifications', component : NotificationsComponent},
      {path : 'restaurantmenu', component : RestaurantmenuComponent},
      {path : 'stocks', component : StockComponent},
      {path : 'norms', component : NormsComponent},
      {path : 'settings', component : SettingsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
 }
