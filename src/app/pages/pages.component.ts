import {Component, isDevMode, OnInit, ViewChild} from '@angular/core';
import {ShopComponent} from './shop/shop.component';
import {EventEmiterService} from '../services/emit/emit.service';
declare function inica_plungin_leo();
declare function inica_plungin_leo2();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(private _eventEmiter: EventEmiterService) { }
  ngOnInit() {
    this._eventEmiter.dataStr.subscribe(data =>{if (isDevMode()) console.log("------TEST "+data);});
    inica_plungin_leo();
    inica_plungin_leo2();
  }

}
