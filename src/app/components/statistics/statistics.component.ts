import { Component, OnInit, ViewChild } from '@angular/core';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { ManagementService } from 'src/app/services/management.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  companyId = sessionStorage.getItem('companyId');
  totalForDelivery : any = 0;
  totalBills : any = 0;
  totalPrice : any = 0;
  public primaryXAxis: Object | undefined;
  public primaryYAxis: Object | undefined;
  public dataManager: DataManager = new DataManager({
  url: 'https://ej2services.syncfusion.com/production/web-services/api/Orders'
  });
  public query: Query = new Query().take(5).where('Estimate', 'lessThan', 3, false);
  elem: HTMLElement | undefined;

  constructor(private managementService : ManagementService) {

  }


  ngOnInit(): void {
    this.elem = document.documentElement;
    this.getDataForDelivery();
    this.getDataForTotalOrders();
    this.getTotalPriceForBills();
    this.primaryXAxis = {
      rangePadding: 'Additional',
      valueType: 'Category',
      title: 'Продукти'
  };
  this.primaryYAxis = {
      title: 'Количина'
  };
  }

  fullScreen() {
    let elem = document.documentElement;
    let methodToBeInvoked = elem.requestFullscreen ||
       elem['mozRequestFullscreen']
      ||
      elem['msRequestFullscreen'];
    if (methodToBeInvoked) methodToBeInvoked.call(elem);
  }

  getDataForDelivery(){
    this.managementService.getDataForDelivery(this.companyId).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.totalForDelivery = data.length;
      }
    });
  }

  getDataForTotalOrders(){
    this.managementService.getDataForTotalOrders(this.companyId).subscribe(data =>{
      if(data != null && data != "" && data != []){
        console.log(data);
        this.totalBills = data.length;
      }
    });
  }

  getTotalPriceForBills(){
    this.managementService.getTotalPriceForBills(this.companyId).subscribe(data =>{
      if(data != null && data != "" && data != []){
        for(let i = 0; i <= data.length; i++){
          this.totalPrice += data[i].quantity * data[i].idProduct.price
        }
      }
    });

  }

}


