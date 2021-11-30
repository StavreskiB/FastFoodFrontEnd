import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  time = new Date();

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date();
   }, 1000);
  }

}
