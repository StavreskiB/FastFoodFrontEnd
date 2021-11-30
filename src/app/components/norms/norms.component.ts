import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-norms',
  templateUrl: './norms.component.html',
  styleUrls: ['./norms.component.css']
})
export class NormsComponent implements OnInit {
  newNorms: any = false;
  normsTable: any = false;
  constructor() { }

  ngOnInit(): void {
  }

  addNorms(){
    this.newNorms = true;
  }

  showNormsTable(){
    this.normsTable = true;
  }
}
