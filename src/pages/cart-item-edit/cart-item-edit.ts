import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';
import { CartProvider } from '../../providers/cart/cart'; 

/**
 * Generated class for the CartItemEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-cart-item-edit',
  templateUrl: 'cart-item-edit.html',
})
export class CartItemEditPage {

  item:any;
  index:any;
  constructor(private cart:CartProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get("item");
    this.index = this.navParams.get("index");
    console.log(this.index);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartItemEditPage');
  }

  submit(){
    console.log(this.item);
    this.navCtrl.push(CheckoutPage);
  }

  dismiss(){
    this.navCtrl.push(CheckoutPage);
  }

  calculatePrice(){
  	this.item.totalPrice = this.item.quantity * this.item.item.itemPrice;
  }


}
