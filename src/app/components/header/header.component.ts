import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  time = new Date();
  companyId = sessionStorage.getItem('companyId');
  companyName : any;
  userEmail = sessionStorage.getItem('email');

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date();
   }, 1000);

   this.getCompany();0
  }

  getCompany(){
    this.companyService.getCompany(this.companyId).subscribe(data => {
      if(data != "" || data != null || data != []){
        console.log(data);
        this.companyName = data.name;
      } else {

      }
    });
    
  }

}
