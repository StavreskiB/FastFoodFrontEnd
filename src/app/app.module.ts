import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { ManagementComponent } from './components/management/management.component';
import { ManagementService } from './services/management.service';
import { ServiceService } from './services/service.service';
import { ServiceComponent } from './components/service/service.component';

@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent,
    LoginComponent,
    LoginService,
    ManagementComponent,
    ManagementService,
    ServiceService,
    ServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
