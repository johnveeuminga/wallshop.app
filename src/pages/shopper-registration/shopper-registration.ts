import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { IonicStorageModule, Storage} from '@ionic/storage'
import { ShopperProvider } from '../../providers/shopper/shopper';
import { ShopperPage } from '../shopper/shopper'

/**
 * Generated class for the ShopperRegistrationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-shopper-registration',
  templateUrl: 'shopper-registration.html',
})
export class ShopperRegistrationPage {

  data = {email: ""};
  constructor(private shopperCtrl: ShopperProvider, private storage:Storage, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopperRegistrationPage');
  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }

  submit(){
    this.shopperCtrl.getShopperByEmail(this.data.email)
      .then( res => {
        if(res.length > 0){
          this.shopperCtrl.shopper = res.item(0);

          this.navCtrl.push(ShopperPage);
        }else{
          this.shopperCtrl.createShopper(this.data).then( res => {
            this.shopperCtrl.shopper = {
              id: res.insertId,
              email: this.data.email
            };

            console.log(this.shopperCtrl.shopper);
            this.navCtrl.push(ShopperPage);
          })
        }
      })
  }

}
