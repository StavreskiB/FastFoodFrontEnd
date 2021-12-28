import { Component, Directive, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bills } from 'src/app/models/bills';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductService } from 'src/app/services/product.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})


export class RestaurantComponent implements OnInit {

  bills : Bills;
  userEmail = sessionStorage.getItem('email');
  userType = sessionStorage.getItem('userType');
  companyId = sessionStorage.getItem('companyId');
  orderForm: any = FormGroup;
  allStockList : any = [];
  addons : any = "K M Kr S";
  showDescription : any = false;
  characters = [''];
  linkIndex = 0;
  selectedTableName = "";
  selectedTableType = "";
  productForMarkList = [];
  itemBillsList : any = [];
  totalPrice : number = 0;
  toggle1 : any = false; toggle2 : any = false;  toggle3 : any = false;  toggle4 : any = false;  toggle5 : any = false;  toggle6 : any = false;  toggle7 : any = false;  toggle8 : any = false;  toggle9 : any = false;  toggle10 : any = false;  toggle11 : any = false;
  toggleF1 : any = false;  toggleF2 : any = false; toggleF3 : any = false;  toggleF4 : any = false; toggleF5 : any = false;  toggleF6 : any = false;  toggleF7 : any = false;  toggleF8 : any = false;  toggleF9 : any = false;  toggleF10 : any = false;  toggleF11 : any = false;
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  showLeftTable = false;
  showForMark = false;
  showBillsItem = false;
  searchedText = "";
  @ViewChild("src") src: ElementRef;
  @ViewChild("quantity") quantity: ElementRef;
  address : any = "";

  constructor(private router: Router, 
        private fb: FormBuilder, 
        private notify : NotifyService,
        private restaurantService : RestaurantService,
        private productService : ProductService,
        ) {
          this.orderForm = fb.group({
            'address': ['', Validators.required],
            'product': ['', Validators.required],
            'addons': ['', Validators.required],
            'quantity': ['', Validators.required],
          });
        }


  ngOnInit(): void {
    this.getAllStock();
    this.getReservedTable();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => this._filter(value)),
    );

  }

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  

  selectTable(type, number){

    this.selectedTableName = number;
    this.selectedTableType = type;
    this.showDescription = false;
    this.showLeftTable = true;

    this.getBillsForMark(type, number);
    this.getBillsItem(number);

    this.src.nativeElement.focus();

  }

  selectTableDelivery(type, number){
    this.showDescription = true;
    this.selectedTableName = number;
    this.selectedTableType = type;
    this.showLeftTable = true;

    this.getBillsForMark(type, number);
    this.getBillsItem(number);

    this.src.nativeElement.focus();

  }

  getReservedTable(){
    this.restaurantService.getReservedTable(this.companyId).subscribe(data =>{
      if(data != null && data != "" && data != []){
        for(let i = 0; i < data.length; i++){
          if(data[i].tables == 1) 
            this.toggleF1 = true;
          
          if(data[i].tables == 2)
              this.toggleF2 = true;

          if(data[i].tables == 3)
              this.toggleF3 = true;
          
          if(data[i].tables == 4)
            this.toggleF4 = true;

          if(data[i].tables == 5)
            this.toggleF5 = true
          
          if(data[i].tables == 6)
            this.toggleF6 = true;

          if(data[i].tables == 7)
          this.toggleF7 = true;
        
          if(data[i].tables == 8)
          this.toggleF8 = true;

          if(data[i].tables == 9)
          this.toggleF9 = true;

          if(data[i].tables == 10)
          this.toggleF10 = true;

          if(data[i].tables == 11)
          this.toggleF11 = true;
          
        }
      }
    });
  }

  deleteMark(idBills){
    this.restaurantService.deleteMark(idBills).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.getBillsForMark(this.selectedTableType, this.selectedTableName)
        this.orderForm.controls['product'].setValue("");
        this.orderForm.controls['quantity'].setValue("");
      }
    });
  }

  getAllStock(){
    this.productService.getProductForStockTable(this.companyId).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.allStockList = data;
        console.log(this.allStockList);
        for(let i = 0 ; i < this.allStockList.length; i++){
          //this.characters.push(this.allStockList[i].idProduct.name)
          this.options.push(this.allStockList[i].idProduct.name)
        }
      }else{

      }
    });
  }

  printMark(){
    this.restaurantService.convertToBills(this.selectedTableName, this.companyId).subscribe(data =>{
      if(data != null && data != "" && data != []){
         this.getReservedTable();
         this.productForMarkList = [];
         this.showForMark = false;
         this.orderForm.controls['product'].setValue("");
         this.orderForm.controls['quantity'].setValue("");
         this.getBillsItem(this.selectedTableName)
        }
     });
  }

  getBillsItem(selectedTableName){
    this.itemBillsList = [];
    this.totalPrice = 0;
    this.restaurantService.getBillsItem(selectedTableName, this.companyId).subscribe(data =>{
      if(data != null && data != "" && data != []){
          console.log("convert to bILLS", data);
          this.address = data[0].address
          this.itemBillsList = data;
          this.showBillsItem = true; 
          for(let i = 0; i < this.itemBillsList.length; i++) {   
              this.totalPrice = this.totalPrice + (this.itemBillsList[i].idProduct.price * this.itemBillsList[i].quantity);
          }
        } else {
          this.itemBillsList = [];
          this.showBillsItem = false;
        }
     });
  }

  getFromSearch(c){
    this.orderForm.controls['product'].setValue(c)
    this.showLeftTable = true;
    this.quantity.nativeElement.focus();
  }

  onChangeOption($event){
    this.orderForm.controls['product'].setValue($event.option.value)
    this.showLeftTable = true;
    this.quantity.nativeElement.focus();
  }

  

  getBillsForMark(type, number){
    this.productForMarkList = [];
    this.restaurantService.getBillsForMark(number, this.companyId, type, 1).subscribe(data =>{
      if(data != null && data != "" && data != []){
          console.log("getBillsForMark", data);
          this.productForMarkList = data;
          this.showForMark = true;
        } else {
          this.productForMarkList = [];
          this.showForMark = false;
        }
     });
  }

  // sss($event){
  //   alert("1");
  // }

  addForMark(){
    let productName = this.orderForm.controls['product'].value;
    let quantity = this.orderForm.controls['quantity'].value;
    let description = this.orderForm.controls['address'].value;    
    this.restaurantService.saveForMark(this.selectedTableName, productName, quantity, description, this.addons, this.companyId, this.userEmail, this.selectedTableType, "Markica").subscribe(data =>{
     // if(data){
        this.src.nativeElement.focus();
        this.showForMark = true;
        this.getBillsForMark(this.selectedTableType, this.selectedTableName)
       ///}
     });
     this.orderForm.controls['quantity'].setValue("");
  }

  onCheck(value){
    if(this.addons.includes(value)){
        this.addons = this.addons.replace(value, '');
      } else {
        this.addons += value + " ";
     }
  }

  printBill(){
    this.restaurantService.printBills(this.selectedTableName, this.companyId).subscribe(data =>{
      if(data != null && data != "" && data != []){
          console.log("printBills", data);
          location.reload();
        }
     });
  }
 
}


