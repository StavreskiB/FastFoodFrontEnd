import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  isFocus: any = false;

  constructor() { }

  ngOnInit(): void {
  }

  addNewEmployee(){
    // alert("not implemented")
  }
  
  getEmpFromTable(){
    alert("not implemented")
  }

}
 