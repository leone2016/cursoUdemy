import { Component, OnInit } from '@angular/core';
import {ProvinciasService} from '../../services/service.index';
import {ProvinciasModule} from '../../models/provincias.module';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: []
})
export class CheckoutComponent implements OnInit {
  private seasons: string[] = ['Tarjeta de Credito', 'Tarjeta de credito', 'Paypal ', 'Deposito'];
  private meses: string[] = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  private anios: number[] = [2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030];
 private provincia:ProvinciasModule[]=[];
  constructor(private provincias: ProvinciasService) { }

  ngOnInit() {
    this.provincias.getProvincias().subscribe((test:ProvinciasModule[])=>{
      this.provincia= test;
      console.log(test);
    })
  }

}
