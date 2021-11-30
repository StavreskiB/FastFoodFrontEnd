import { Component, OnInit, ViewChild } from '@angular/core';
import { DataManager, Query } from '@syncfusion/ej2-data';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public primaryXAxis: Object | undefined;
  public primaryYAxis: Object | undefined;
  public dataManager: DataManager = new DataManager({
  url: 'https://ej2services.syncfusion.com/production/web-services/api/Orders'
  });
  public query: Query = new Query().take(5).where('Estimate', 'lessThan', 3, false);
  elem: HTMLElement | undefined;

  constructor() {

  }


  ngOnInit(): void {
    this.elem = document.documentElement;
    
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

}


