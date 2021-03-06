import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-restaurantmenu',
  templateUrl: './restaurantmenu.component.html',
  styleUrls: ['./restaurantmenu.component.css']
})
export class RestaurantmenuComponent implements OnInit {
  productForm: FormGroup;
  product : Product;
  update = false;
  productTypeList : [];
  productForUpdate : [];
  stockList : [];
  productWithoutQuantity: [];
  userEmail = sessionStorage.getItem('email');
  userType = sessionStorage.getItem('userType');
  companyId = sessionStorage.getItem('companyId');
  constructor(private productService : ProductService,
    private router: Router,
    private fb: FormBuilder, 
    private notify : NotifyService) {
      this.productForm = fb.group({
        'product': ['', Validators.required],
        'type': ['', Validators.required],
        'quantity': ['', Validators.required],
        'price': ['', Validators.required],
        'updateproduct': ['', Validators.required],
        'updatetype': ['', Validators.required],
        'updatequantity': ['', Validators.required],
        'updateprice': ['', Validators.required],
      });
    }

  ngOnInit(): void {
    this.getAllProductType();
    this.getStockByCompanyId();
    this.getAllProductByCompanyId();
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
        this.stockList = data;
        console.log(this.stockList)
      }else{
      
      }
    });
  }

  getAllProductByCompanyId(){
    this.productService.getAllProductForSell(this.companyId).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.productWithoutQuantity = data;
        console.log("this.productWithoutQuantity", this.productWithoutQuantity)
      }else{
      
      }
    });
  }


  getStockFromTableByProductId(productId){
    this.productService.getStockFromTableByProductId(this.companyId, productId).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.productForUpdate = data;
        this.update = true;
        this.productForm.controls['updatetype'].setValue(data[0].idProduct.idProductType.idProductType);
        this.productForm.controls['updateproduct'].setValue(data[0].idProduct.idProduct);
        this.productForm.controls['updatequantity'].setValue(data[0].idProduct.quantity);
        this.productForm.controls['updateprice'].setValue(data[0].idProduct.price);
      } else {
        this.notify.showError("?????????????? ????????????, ?????????????????? ?????? ???? ???????????? ???? ?? ??????????????????!", "");
      }
    });
  }


  addNewProduct(){
    this.product = new Product();
    this.product.idProductType = {idProductType: this.productForm.controls['type'].value.toString(), name: ""};
    this.product.name = this.productForm.controls['product'].value;
    this.product.price = this.productForm.controls['price'].value;
    this.product.dateInsert = ""
    this.product.companyId = this.companyId;
    this.product.status = "1";
    this.product.quantity = this.productForm.controls['quantity'].value;

    this.productService.addProductInMenu(this.product).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.getAllProductByCompanyId();
        this.getStockByCompanyId();
        this.notify.showSuccess("?????????????????? ?? ??????????????!", "");
      }else{
        this.notify.showError("?????????????? ????????????, ?????????????????? ???? ?? ??????????????!", "");
      }
    });
  }

  updateProduct(){
    this.product = new Product();
    this.product.idProductType = {idProductType: this.productForm.controls['updatetype'].value.toString(), name: ""};
    this.product.name = this.productForm.controls['updateproduct'].value;
    this.product.price = this.productForm.controls['updateprice'].value;
    this.product.dateInsert = ""
    this.product.companyId = this.companyId;
    this.product.status = "1";
    this.product.quantity = this.productForm.controls['updatequantity'].value;
    this.productService.addProductInMenu(this.product).subscribe(data =>{
      if(data != null && data != "" && data != []){
        console.log(data)
        this.getAllProductByCompanyId();
        this.getStockByCompanyId();
        this.notify.showSuccess("?????????????????? ?? ?????????????? ???? ????????????!", "");
      }else{
        this.notify.showError("?????????????? ????????????, ?????????????????? ???? ?? ??????????????!", "");
      }
    });
  }
  
  onChangeProduct(idStock){
    this.productService.getProductDataById(this.companyId, idStock).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.productForm.controls['type'].setValue(data);
      }else{
        this.notify.showError("?????????????? ????????????, ?????????????????? ?????? ???? ???????????????? ???? ?? ??????????????????!", "");
      }
    });
  }
}
