import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Invoice } from 'src/app/models/invoice';
import { Invoiceitem } from 'src/app/models/invoiceitem';
import { Product } from 'src/app/models/product';
import { InvoiceService } from 'src/app/services/invoice.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  userEmail = sessionStorage.getItem('email');
  userType = sessionStorage.getItem('userType');
  companyId = sessionStorage.getItem('companyId');
  invoice : Invoice;
  showItems = false;
  newInvoiceFlag = false;
  globalInvoiceName : any;
  globalProductId : any;
  invoiceItem : Invoiceitem;
  showItemsAdd : any = true;
  invoiceForm: FormGroup;
  invoiceItemForm : FormGroup;
  allInvoiceList : any = [];
  totalPrice : any = 0;
  allStockList : any = [];
  disableSelect : any = false;
  invoiceItemList : any;
  saveNewInvoiceBtn : any = true;
  selectedInvoice : any = "";
  constructor(private productService : ProductService,
    private router: Router,
    private fb: FormBuilder, 
    private notify : NotifyService,
    private invoiceService : InvoiceService) {
      this.invoiceForm = fb.group({
        'company': ['', Validators.required],
        'invoiceNr': ['', Validators.required],
        'dateIssued': ['', Validators.required],
        'deadline': ['', Validators.required],
        'price': ['', Validators.required],
        'status': ['', Validators.required],
      });
      this.invoiceItemForm = fb.group ({
        'product' : ['', Validators.required],
        'quantity' : ['', Validators.required],
        'price' : ['', Validators.required],        
      })
     }

  ngOnInit(): void {
    this.getAllInvoice();
    this.getStockByCompanyId()
  }

  getInvFromTable(id){
    this.showItemsAdd = false
    this.getItemsByInvoiceId(id);
    this.getInvoiceByName(id);
    this.showItems = true;
    this.newInvoiceFlag = true;
    this.saveNewInvoiceBtn = false;
    this.disableSelect = true;
    this.selectedInvoice = id;
  }

  newInvoice(){
    this.newInvoiceFlag = true;
    this.showItemsAdd = true;
    this.saveNewInvoiceBtn = true;
    this.invoiceForm.reset();
    this.invoiceItemList = [];
    this.disableSelect = false;
  }

  updateInvoiceStatus(){
    this.invoiceService.changeInvoiceStatus(this.selectedInvoice).subscribe(data =>{
      if(data){
        this.getAllInvoice();
        this.notify.showSuccess("Статусот на фактурата е успешно променет!", "")
      }else{
        this.notify.showError("Настана грешка!", "")
      }
    });
  }

  getStockByCompanyId(){
    this.productService.getAllStockByCompanyId(this.companyId).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.allStockList = data;
        console.log(this.allStockList)
      }else{
      
      }
    });
  }

  getInvoiceByName(invoiceName){
    this.invoiceService.getInvoiceByName(invoiceName).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.invoiceForm.controls['company'].setValue(data[0].companyName)
        this.invoiceForm.controls['invoiceNr'].setValue(data[0].name)
        this.invoiceForm.controls['dateIssued'].setValue(data[0].dateInsert)
        this.invoiceForm.controls['deadline'].setValue(data[0].deadline)
        this.invoiceForm.controls['price'].setValue(data[0].price)
        this.invoiceForm.controls['status'].setValue(data[0].status)
      }else{
      
      }
    });
  }

  add(){
      this.invoiceItem = new Invoiceitem();
      this.invoiceItem.companyId = this.companyId;
      this.invoiceItem.productId = this.invoiceItemForm.controls['product'].value;
      this.invoiceItem.invoiceName = this.globalInvoiceName;
      this.invoiceItem.quantity =  this.invoiceItemForm.controls['quantity'].value;
      this.invoiceItem.price = this.invoiceItemForm.controls['price'].value;

    this.invoiceService.saveInvoiceItem(this.invoiceItem).subscribe(data =>{
      if(data != null && data != "" && data != []){
        console.log("data", data)
        this.getItemsByInvoiceId(this.invoiceItem.invoiceName)
        this.notify.showSuccess("Продуктот е успешно додаден!", "")
      }else{
        this.notify.showError("Настана грешка!", "")
        console.log("data", data)

      }
    });
  }

  getItemsByInvoiceId(invoiceName){
    this.invoiceService.getItemsByInvoiceId(invoiceName).subscribe(data =>{
      if(data != null && data != "" && data != []){
          this.invoiceItemList = data;
          console.log(this.invoiceItemList)
      }
    });
  }

  getAllInvoice(){
    this.invoiceService.getAllInvoice(this.companyId).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.allInvoiceList = data;
      }else{
      }
    });
  }


  saveNewInvoice(){
    this.invoice = new Invoice();

    this.invoice.companyName = this.invoiceForm.controls['company'].value;
    this.invoice.name = this.invoiceForm.controls['invoiceNr'].value;
    this.invoice.dateInsert = this.invoiceForm.controls['dateIssued'].value;
    this.invoice.deadline = this.invoiceForm.controls['deadline'].value;
    this.invoice.price = this.invoiceForm.controls['price'].value;
    this.invoice.status = this.invoiceForm.controls['status'].value;
    this.invoice.companyId = this.companyId;


    this.invoiceService.saveNewInvoice(this.invoice).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.globalInvoiceName = this.invoiceForm.controls['invoiceNr'].value;
        this.disableSelect = true;
        this.showItems = true;
        this.getAllInvoice();
        this.notify.showSuccess("Фактурата е успешно зачувана", "");
      }else{
        this.notify.showError("Настана грешка!", "");
      }
    });

  }
}
