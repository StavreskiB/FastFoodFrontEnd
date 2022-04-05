import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/services/notify.service';
import * as CryptoJS from 'crypto-js';
import { TokenReq } from '../../models/tokenReq';
import { Users} from '../../models/users'
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  isFocus: any = false;
  employee: any = FormGroup;
  token: any = TokenReq;
  users : Users;
  userEmail = sessionStorage.getItem('email');
  userType = sessionStorage.getItem('userType');
  companyId = sessionStorage.getItem('companyId');
  employeeList : [];
  showUpdate = false;
  encryptedPassword: any;
  idForUpdate : any;
  constructor(private router: Router,
        private fb: FormBuilder, 
        private notify : NotifyService,
        private loginService : LoginService) {
        this.employee = fb.group({
          'name': ['', Validators.required],
          'surname': ['', Validators.required],
          'email': ['', Validators.required],
          'password': ['', Validators.required],
        });
    }

  ngOnInit(): void {
    this.getAllEmployee();
    this.showUpdate = false;
  }

  addNewEmployee(){
    if(this.employee.controls['name'].value == "" || this.employee.controls['surname'].value == "" || this.employee.controls['password'].value == "" || this.employee.controls['email'].value == ""){
      this.notify.showInfo("Сите полиња мора да се пополнети", "")
    } else {
      this.encryptedPassword = this.passEncrypt(this.employee.controls['password'].value);
      this.users = new Users();
      this.users.idUserType = {idUserType: "2", name : "Employee"}
      this.users.name = this.employee.controls['name'].value;
      this.users.surname = this.employee.controls['surname'].value;
      this.users.password = this.encryptedPassword;
      this.users.email = this.employee.controls['email'].value;
      this.users.dateInsert = "";
      this.users.companyId = this.companyId;

      this.loginService.SaveNewUser(this.users).subscribe(data =>{
        if(data != null && data != "" && data != []){
          console.log(data);
          this.notify.showSuccess("Успешно зачувано", "");
          this.getAllEmployee();
        }else{
          this.notify.showError("Настана грешка", "");
        }
      });

    } 
  }

  getAllEmployee(){
    this.loginService.getAllEmployee(this.companyId).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.employeeList = data;
        console.log(this.employeeList)
      }else{
    
      }
    });
  }

  passEncrypt(password){
    let variablea = "byujkr";
    let variablee = "rijdnd";
    let variableh = "safds";
    let variables = "progres";
    let variableb = "ebanking";
    return btoa(CryptoJS.AES.encrypt(password, variablea[2] + variablee[4] + variableh[1] + variables[3] + variableb[5]).toString());
  }
  
  getEmpFromTable(empId){
    this.showUpdate = true;
    this.loginService.getEmpById(this.companyId, empId).subscribe(data =>{
      if(data != null && data != "" && data != []){
        console.log(data)
        this.idForUpdate = data[0].idUser;
        this.employee.controls['name'].setValue(data[0].name)
        this.employee.controls['surname'].setValue(data[0].surname)
        this.employee.controls['password'].setValue("")
        this.employee.controls['email'].setValue(data[0].email)
      }else{
      
      }
    });
  }

  updateEmployee(){
    this.users = new Users();

    if(this.employee.controls['password'].value != ""){
       this.encryptedPassword = this.passEncrypt(this.employee.controls['password'].value);
       this.users.password = this.encryptedPassword;
    } 

    this.users.idUserType = {idUserType: "2", name : "Employee"}
    this.users.name = this.employee.controls['name'].value;
    this.users.surname = this.employee.controls['surname'].value;
    this.users.email = this.employee.controls['email'].value;
    this.users.dateInsert = "";
    this.users.companyId = this.companyId;

    this.loginService.UpdateUser(this.users, this.idForUpdate).subscribe(data =>{
      if(data != null && data != "" && data != []){
        this.showUpdate = false;
        this.getAllEmployee();
        this.notify.showSuccess("Успешно изменето", "");
      }else{
        this.notify.showError("Настана грешка", "");
      }
    });
  }
}
 