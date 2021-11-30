import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  showNewInv = false;
  showProd = false;

  constructor() { }

  ngOnInit(): void {
  }

  getInvFromTable(){
    alert("not implemented")
  }

  showNewInvoice(){
    this.showNewInv = true;
  }

  showProducts(){
    this.showProd = true;
  }
}
