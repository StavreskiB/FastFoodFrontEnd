import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms'
import { LoginService } from 'src/app/services/login.service';
import { TokenReq } from '../../models/tokenReq';
import * as CryptoJS from 'crypto-js';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-login',  
  templateUrl: './login.component.html',      
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token: any = TokenReq;
  user: any = FormGroup;
  variablea = "byujkr";
  variablee = "rijdnd";
  variableh = "safds";
  variables = "progres";
  variableb = "ebanking";
  encryptedPassword: any;

  constructor(private router: Router,
             private fb: FormBuilder, 
             private loginService : LoginService,
             private notify : NotifyService) {
              this.user = this.fb.group({
                'username': [''],
                'password': [''],
              });
          }

  ngOnInit(): void { 
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('companyId');
    this.test();
  } 

  login() {  
    if (this.user.controls['username'].value == "" || this.user.controls['password'].value == "") {
          this.notify.showError("Мора сите полиња да се пополнети", "");
        } else {
          this.encryptedPassword = btoa(CryptoJS.AES.encrypt(this.user.controls['password'].value, this.variablea[2] + this.variablee[4] + this.variableh[1] + this.variables[3] + this.variableb[5]).toString());
          this.token = new TokenReq();
          this.token.email = this.user.controls["username"].value;
          this.token.pasword = this.encryptedPassword; 
        
          this.loginService.Login(this.token).subscribe(data =>{
            console.log(data);
            if(data != null && data != "" && data != []){
              console.log(data);
                if(data.jwt != null && data.jwt != "" && data.jwt != []){
                  sessionStorage.setItem('jwt', data.jwt);
                  sessionStorage.setItem('email', data.userEmail);
                  sessionStorage.setItem('userType', data.userType);
                  sessionStorage.setItem('companyId', data.companyId);
                      this.router.navigate(['/home']);
                }
                else{
                this.notify.showError("Грешка при најава", "");
              }
            }else{
              this.notify.showError("Грешка при најава", "");
            }
          });
        }
     }


     test(){

     this.loginService.test().subscribe(data =>{
      console.log(data);
  
     });
    }

}
