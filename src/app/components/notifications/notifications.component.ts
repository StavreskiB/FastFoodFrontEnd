import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from 'src/app/services/invoice.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  userEmail = sessionStorage.getItem('email');
  userType = sessionStorage.getItem('userType');
  companyId = sessionStorage.getItem('companyId');
  limitList : any = [];
  invoiceInfo : any = [];
  constructor(private productService : ProductService,
    private router: Router,
    private fb: FormBuilder, 
    private notify : NotifyService,
    private invoiceService : InvoiceService) { }

  ngOnInit(): void {
    this.getLimitProduct();
    this.getLimitInvoice();
  }

  getLimitProduct(){
    this.productService.getLimitProduct(this.companyId).subscribe(data =>{
      if(data != null || data != [] || data != ""){
        console.log(data);
        this.limitList = data;
      }else{
        this.notify.showInfo("Нема продукти на кои им завршува залихата!", "")
      }
    });
  }


  getLimitInvoice(){
    this.invoiceService.getLimitInvoice(this.companyId).subscribe(data =>{
      if(data != null || data != [] || data != ""){
        this.invoiceInfo = [];
      }else{
        this.notify.showInfo("Нема фактура за плаќање според наведениот датум за известување!", "")
      }
    });
  }

}
