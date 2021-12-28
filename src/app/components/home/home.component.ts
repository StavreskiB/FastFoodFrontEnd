import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  manager = false;
  worker = false;
  constructor(private router : Router,
    private loginService : LoginService) { }
  userEmail = sessionStorage.getItem('email');
  userType = sessionStorage.getItem('userType');
  companyId = sessionStorage.getItem('companyId');

  ngOnInit(): void {
    this.securityCheck();
    if(this.userType == "Manager")
    {
      this.manager = true;
      this.router.navigate(['/home/management']);
    } else {
      this.worker = true;
      this.router.navigate(['/home/restaurant']);
    }
  }


  securityCheck(){
    this.loginService.IsTokenExpired().subscribe(checkToken => {
      if(checkToken){
        sessionStorage.clear();
        this.router.navigate(['/login']);
      } else {

      }
    });
  }
}
