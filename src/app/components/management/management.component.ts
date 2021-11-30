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
    this.router.navigateByUrl('/statistic');
  }

  getInv(){
    this.router.navigateByUrl('/invoice');
  }

  getReport(){
    this.router.navigateByUrl('/reports');
  }

  getStock(){
    this.router.navigateByUrl('/stocks');
  }

  getMenu(){
    this.router.navigateByUrl('/restaurantmenu');  
  }


  getNorms(){
    this.router.navigateByUrl('/norms');  
  }

  getEmp(){
    this.router.navigateByUrl('/employee');
  }
  getSettings(){
    this.router.navigateByUrl('/settings');
  }

  logout(){
    alert("logout");
  }

}
