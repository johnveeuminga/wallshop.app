import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ShopperPage } from '../shopper/shopper';
import { HomePage } from '../home/home';

/**
 * Generated class for the ConfirmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {

  code = "";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.code = this.navParams.get("code");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }

  goToShopper(){
    this.navCtrl.push(HomePage);
  }

}
