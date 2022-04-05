import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagementService } from 'src/app/services/management.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  userEmail = sessionStorage.getItem('email');
  userType = sessionStorage.getItem('userType');
  companyId = sessionStorage.getItem('companyId');
  totalPrice = 0;
  reportsList : any = [];
  isOpen: boolean;
  filteredList : any = [];
  productForReports : any = [];
  constructor(private managementService : ManagementService,
    private router: Router,
    private fb: FormBuilder, 
    private notify : NotifyService) { }

  ngOnInit(): void {
      this.getReports()
  }


  getReports(){
     this.managementService.getReports(this.companyId).subscribe(data =>{
      if(data != null && data != "" && data != []){
        console.log(data)
        this.reportsList = data;
      }else{
      
      }
    });
  }

  getItemForExpPanel(result){
    this.totalPrice = 0;
    this.productForReports = [];
    this.managementService.getItemForExpPanel(this.companyId, result.date, result.shift).subscribe(data =>{
      if(data != null && data != "" && data != []){
        console.log(data);
        this.totalPrice = result.price
        this.productForReports = data;
      }else{
      
      }
    });
  }
}
