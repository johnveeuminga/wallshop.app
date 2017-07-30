import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ShopperPage } from '../shopper/shopper';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  public goToLogin(){
 	this.navCtrl.push(LoginPage);
  }

  public goToShopper(){
  	this.navCtrl.push(ShopperPage);
  }

}
