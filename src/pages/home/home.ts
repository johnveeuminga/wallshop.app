import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ShopperPage } from '../shopper/shopper';
import { ShopperRegistrationPage } from '../shopper-registration/shopper-registration';

import { IonicStorageModule, Storage } from  '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private storage: Storage, public navCtrl: NavController) {

  }

  public goToLogin(){
 	this.navCtrl.push(LoginPage);
  }

  public goToShopper(){
    this.storage.get("shopper")
      .then(res => {
        if(res){
          this.navCtrl.push(ShopperPage);
        }else{
          this.navCtrl.push(ShopperRegistrationPage);
        }
      })
  }

}
