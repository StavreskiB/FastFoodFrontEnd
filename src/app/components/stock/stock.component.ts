import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Stock } from 'src/app/models/stock';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  newProduct = false;
  productForm: FormGroup;
  product : Product;
  stock : Stock;
  productTypeList : [];
  stockList : [];
  userEmail = sessionStorage.getItem('email');
  userType = sessionStorage.getItem('userType');
  companyId = sessionStorage.getItem('companyId');
  disableSelect = true;
  constructor(private productService : ProductService,
        private router: Router,
        private fb: FormBuilder, 
        private notify : NotifyService) {
    this.productForm = fb.group({
      'product': ['', Validators.required],
      'newProduct': ['', Validators.required],
      'type': ['', Validators.required],
      'quantity': ['', Validators.required],
    });
   }

  ngOnInit(): void {
    this.getAllProductType();
    this.getProductForStockTable();
  }

  showNewProduct(){
    this.newProduct = true;
    this.disableSelect = !this.disableSelect;
  }


  getAllProductType(){
    this.productService.getAllTypeOfProduct().subscribe(data =>{
      if(data != null && data != "" && data != []){
        console.log(data)
        this.productTypeList = data;
      }else{
      
      }
    });
  }

  getProductForStockTable(){
    this.productService.getProductForStockTable(this.companyId).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.stockList = data;
      }else{
      
      }
    });
  }

  addInStock(){
     this.productService.addProductInStock(this.companyId, this.productForm.controls['product'].value, this.productForm.controls['quantity'].value).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.notify.showSuccess("Количината е успешно додадена во залиха", "")
      }else{
        this.notify.showError("Настана грешка, продуктот не е додаден во залиха!", "");
      }
    });
  }

  onChangeProduct(idStock){
    this.productService.getProductDataById(this.companyId, idStock).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.productForm.controls['type'].setValue(data);
      }else{
        this.notify.showError("Настана грешка, продуктот кој го избравте не е пронајден!", "");
      }
    });
  }

  addNewProduct(){
    if(this.productForm.controls['newProduct'].value == "" || this.productForm.controls['type'].value == "" || this.productForm.controls['quantity'].value == "" ){
          this.notify.showInfo("Сите полиња мора да се пополнети", "")
    } else {
      this.product = new Product();
      this.product.idProductType = {idProductType: this.productForm.controls['type'].value.toString(), name: ""};
      this.product.name = this.productForm.controls['newProduct'].value;
      this.product.price = ""
      this.product.dateInsert = ""
      this.product.companyId = this.companyId;
      this.product.status = "1";
      this.productService.saveNewProduct(this.product, this.productForm.controls['quantity'].value ).subscribe(data =>{
        if(data != null && data != "" && data != []){
          console.log(data)
        }else{
          this.notify.showError("Настана грешка, продуктот не е зачуван!", "");
        }
      });

    }
  }

  getStockFromTable(idStock){
    this.productService.getStockById(this.companyId, idStock ).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.productForm.controls['type'].setValue(data[0].idProduct.idProductType.idProductType);
        this.productForm.controls['product'].setValue(data[0].idProduct.idProduct);
        this.newProduct = false;
        this.disableSelect = true;
      }
    });
  }
}
