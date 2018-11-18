import { Component, OnInit } from '@angular/core';
import {ProvinciasService} from '../../services/service.index';
import {ProvinciasModule} from '../../models/provincias.module';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: []
})
export class CheckoutComponent implements OnInit {

 private provincia:ProvinciasModule[]=[];
  constructor(private provincias: ProvinciasService) { }

  ngOnInit() {
    this.provincias.getProvincias().subscribe((test:Provincias[])=>{
      this.provincia= test;
      console.log(test);
    })
  }

}
