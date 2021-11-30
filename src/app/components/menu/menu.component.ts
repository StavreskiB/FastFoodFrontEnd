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

  getNotification(){
    this.router.navigateByUrl('/notifications');
  }

  getBills(){
    this.router.navigateByUrl('/bills');
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
