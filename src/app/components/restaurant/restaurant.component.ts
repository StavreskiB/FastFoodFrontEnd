import { Component, OnInit } from '@angular/core';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  title = 'angular-text-search-highlight';
  searchText = '';
  showFiller: any = false;
  showForm: any = false;
  myFocusVar = false;

  characters = [
    'Кока кола',
    'Хамбургер',
    'Хамбургер 2',
    'Хамбургер 3',
    'Хамбургер 4',
    'Гиро',
    'Швепс',
    'Чизбургер',
  ]


  constructor() {
    
  }

  check(){
    alert(this.myFocusVar)
  }

  ngOnInit(): void {
  }

  function(c){
    this.showForm = true;
    this.showFiller = false;
  }

  onKeyDown($event){
    if(this.searchText.length > 2){
      this.showFiller = true;
    }

    console.log(this.characters);
  }

  search(){
    alert("fsdf");
  }
}
