import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getStat(){
    this.router.navigateByUrl('/home/statistic');
  }

  getInv(){
    this.router.navigateByUrl('/home/invoice');
  }

  getReport(){
    this.router.navigateByUrl('/home/reports');
  }

  getStock(){
    this.router.navigateByUrl('/home/stocks');
  }

  getMenu(){
    this.router.navigateByUrl('/home/restaurantmenu');  
  }


  getNorms(){
    this.router.navigateByUrl('/home/norms');  
  }

  getEmp(){
    this.router.navigateByUrl('/home/employee');
  }
  getSettings(){
    this.router.navigateByUrl('/home/settings');
  }

  logout(){
    this.router.navigateByUrl('/');
  }

}
