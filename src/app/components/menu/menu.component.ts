import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

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

  getNotification(){
    this.router.navigateByUrl('/home/notifications');
  }

  getBills(){
    this.router.navigateByUrl('/home/bills');
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
