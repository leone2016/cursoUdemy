import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {ProvinciasService} from '../../services/service.index';
import {ProvinciasModule} from '../../models/provincias.module';
import {environment} from '../../../environments/environment';
import {MatSnackBar} from '@angular/material';

declare let paypal:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: []
})
export class CheckoutComponent implements OnInit, AfterViewChecked {
  private seasons: string[] = ['Tarjeta de Credito', 'Tarjeta de credito', 'Paypal ', 'Deposito'];
  private meses: string[] = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  private anios: number[] = [2018,2019,2020,2021,2022,2023,2024,2025,2026,2027,2028,2029,2030];
 private provincia:ProvinciasModule[]=[];
  addScript: boolean = false;
  finalAmount: number = 1;
  paypalLoad: boolean = false;

  constructor(private provincias: ProvinciasService, public snackBar: MatSnackBar) { }



  //env:'production',
  paypalConfig = {
    env:'sandbox',
    client:{
      sandbox:"AbAJdxtyhyyL6XOcWnNL0iyWn_GvUrodgDrotpcTq3tcGhdx8mKM7ZEOtrhe7Gk-sByZM828tE7E-p3B",
      production:"<your-production-key-here>"
    },
    style: {
      layout: 'vertical',  // horizontal | vertical
      size:   'responsive',    // medium | large | responsive
      shape:  'rect',      // pill | rect
      color:  'gold'       // gold | blue | silver | white | black
    },


    commit:true,
    payment: (data,actions)=>{
      // 2. Make a request to your server
      const payURLServer = environment.waki_rest_service_configuration.api_url+environment.waki_rest_service_configuration.ngPayFlow.path;
      return actions.request.post(payURLServer)
        .then(function(res) {
          // 3. Return res.id from the response
          return res.id;
        });
      // return actions.payment.create({
      //   payment:{
      //     transactions:[
      //       {amount: {total: this.finalAmount, currency : 'USD'}}
      //     ]
      //   }
      // });
    },
    // Execute the payment:
    // 1. Add an onAuthorize callback
    onAuthorize: (data,actions)=>{
      // Call your server to execute the payment
      //

      // const payURLServer = environment.waki_rest_service_configuration.api_url+environment.waki_rest_service_configuration.ngPayFlow.path;
      // return paypal.request.post(, data)
      //   .then(function (res) {
      //     console.log(" into 'INSTRUMENT_DECLINED' --> ppal ")
      //     // check for ERROR CODE=INSTRUMENT_DECLINED and restart
      //     if (res.error === 'INSTRUMENT_DECLINED') {
      //       return actions.restart();
      //     }
      //   });
      // Get the payment details
        return actions.payment.execute().then((paymentDetails)=>{
          // Show a confirmation using the details from paymentDetails
          // Then listen for a click on your confirm button
              //when the payent is completed
              // do someting when the payment is successful

        })
    },onCancel: function (data, actions) {
      // Show a cancel page or return to cart
    },onError: function (err) {
      // Show an error page here, when an error occurs
    }
  };
  //paypalConfig is over

  ngAfterViewChecked():void {
      //need to see the botton, when the page is loaded
    if(!this.addScript){
      this.addPaypalScript().then(()=>{
        paypal.Button.render(this.paypalConfig, "#paypal-checkout-btn");
      })
    }
  }

  addPaypalScript(){
    this.addScript=true;
    return new Promise((resolve,reject) =>{
      let scriptTagElemnt = document.createElement('script');
      scriptTagElemnt.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptTagElemnt.onload = resolve;
      document.body.appendChild(scriptTagElemnt);
    })
  }

  private codigoDesc():void{
    this.snackBar.open("Código no valido", 'X', {
      duration: 2000,
    });
  }
  ngOnInit() {
    // this.provincias.getProvincias().subscribe((test:ProvinciasModule[])=>{
    //   this.provincia= test;
    //   console.log(test);
    // })
  }

}

