import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Norms } from 'src/app/models/norms';
import { Product } from 'src/app/models/product';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-norms',
  templateUrl: './norms.component.html',
  styleUrls: ['./norms.component.css']
})
export class NormsComponent implements OnInit {
  newNorms: any = false;
  normsTable: any = true;
  norms : Norms;
  product : Product;
  allStockList : any = [];
  allNorms: any = [];
  productTypeList: any = [];
  normsList : any = [];
  productForm: FormGroup;
  userEmail = sessionStorage.getItem('email');
  userType = sessionStorage.getItem('userType');
  companyId = sessionStorage.getItem('companyId');
  disableSelect = false;
  addNew : any = true;
  globalIdNorms: any = "";
  constructor(private productService : ProductService,
    private router: Router,
    private fb: FormBuilder, 
    private notify : NotifyService) {
      this.productForm = fb.group({
        'mainProduct': ['', Validators.required],
        'product': ['', Validators.required],
        'type': ['', Validators.required],
        'quantity': ['', Validators.required],
      });
    }

  ngOnInit(): void {
    this.getStockByCompanyId();
    this.getAllProductType();
    this.getProductNorms();
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

  getStockByCompanyId(){
    this.productService.getStockByCompanyIdAndType(this.companyId).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.allStockList = data;
        console.log(this.allStockList)
      }else{
      
      }
    });
  }

  getProductNorms(){
      this.productService.getProductNorms(this.companyId).subscribe(data =>{
        if(data != null && data != "" && data != []){
          this.allNorms = data;
          console.log("this.allNorms", this.allNorms)
        }else{
        
        }
      });
  }


  addNorms(){
      this.newNorms = true;
      this.disableSelect = false;
      this.addNew = true;
  }

  onChangeProduct(idStock){
    this.productService.getProductDataById(this.companyId, idStock).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.productForm.controls['type'].setValue(data);
        this.disableSelect = false;
      }else{
        this.notify.showError("Настана грешка, продуктот кој го избравте не е пронајден!", "");
      }
    });
  }

  addNewNorms(){
    let companyId = this.companyId
    let idProduct = this.productForm.controls['mainProduct'].value;
    let idProductN = this.productForm.controls['product'].value;
    let quantity = this.productForm.controls['quantity'].value;

    if(idProduct != "" && idProductN != "" && quantity != ""){

      this.productService.addNewNorms(companyId, idProduct, idProductN, quantity).subscribe(data =>{
        if(data != null && data != "" && data != []){
          this.notify.showSuccess("Нормативот е успешно зачуван", "");
          this.normsTable = true;
          this.onChangeMainProduct(idProduct);
        }else{
          this.notify.showError("Настана грешка!", "");
        }
      });
    } else {
      this.notify.showError("Мора сите полиња да се пополнети!", "")
    }
  }


  onChangeMainProduct(idProduct){
    this.disableSelect = false;
    this.productForm.controls['quantity'].setValue("");
    this.productForm.controls['product'].setValue("");
    this.productForm.controls['type'].setValue("");

    this.productService.getNormsForProductId(idProduct).subscribe(data =>{
      if(data != null && data != "" && data != []){
       this.normsList = data; 
       console.log("norms", this.normsList)
      }else{

      }
    });
  }

  getNormsFromTable(idNorms){
    this.newNorms = true;
    this.globalIdNorms = idNorms;
    this.productService.getNormsById(idNorms).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.disableSelect = true;
        this.addNew = false;
        this.productForm.controls['quantity'].setValue(data[0].quantity)
        this.productForm.controls['product'].setValue(data[0].idProduct.idProduct);
        this.productForm.controls['type'].setValue(data[0].idProduct.idProductType.idProductType);
      }else{

      }
    });
  }



  updateNorms(){
    this.productService.updateNorms(this.globalIdNorms, this.productForm.controls['quantity'].value).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.notify.showSuccess("Нормативот е успешно изменет", "");
      }else{
        this.notify.showError("Настана грешка!", "");
      }
    });
  }
}
