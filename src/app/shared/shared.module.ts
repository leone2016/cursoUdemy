import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import { HeaderComponent } from './header/header.component';

import {
  FooterComponent,

  PagenotfoundComponent,
  SidebarComponent,
  SliderComponent
} from './shared.index';
import {NgModule} from '@angular/core';


@NgModule({
  declarations:[
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    SidebarComponent,
    PagenotfoundComponent
  ],
  imports:[
    RouterModule,
    CommonModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    SidebarComponent,
    PagenotfoundComponent
  ]
})
export class SharedModule {}
