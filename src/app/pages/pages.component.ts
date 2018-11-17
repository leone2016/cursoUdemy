import { Component, OnInit } from '@angular/core';
declare function inica_plungin_leo();
declare function inica_plungin_leo2();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    inica_plungin_leo();
    inica_plungin_leo2();
  }

}
