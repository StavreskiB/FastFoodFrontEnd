import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ManagementComponent } from './components/management/management.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FilterPipe } from './pipes/filter.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { MenuComponent } from './components/menu/menu.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import { ReportsComponent } from './components/reports/reports.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { BillsComponent } from './components/bills/bills.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { StockComponent } from './components/stock/stock.component';
import { NormsComponent } from './components/norms/norms.component';
import { RestaurantmenuComponent } from './components/restaurantmenu/restaurantmenu.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ToastrModule } from 'ngx-toastr';
import { MatDividerModule } from '@angular/material/divider';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { DateFormatOptions } from '@syncfusion/ej2-base'
import { CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService, 
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService,LegendService, TooltipService
 } from '@syncfusion/ej2-angular-charts';
import {MatSidenavModule} from '@angular/material/sidenav';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxPrintModule} from 'ngx-print';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent,
    LoginComponent,
    ManagementComponent,
    RestaurantComponent,
    FilterPipe,
    MenuComponent,
    EmployeeComponent,
    StatisticsComponent,
    InvoiceComponent,
    ReportsComponent,
    NotificationsComponent,
    BillsComponent,
    StockComponent,
    NormsComponent,
    RestaurantmenuComponent,
    SettingsComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,  
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSlideToggleModule, 
    MatChipsModule,
    MatTableModule,
    MatCardModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    ToastrModule.forRoot(),
    MatDividerModule,
    ChartModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    NgxPrintModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [CategoryService, 
    DateTimeService, 
    ScrollBarService, 
    LineSeriesService, 
    ColumnSeriesService, 
    ChartAnnotationService, 
    RangeColumnSeriesService, 
    StackingColumnSeriesService, 
    LegendService, 
    TooltipService,
    { provide:  HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true, },
    { provide: LocationStrategy, useClass: HashLocationStrategy }

  ],
    
  bootstrap: [AppComponent]
})
export class AppModule { }
