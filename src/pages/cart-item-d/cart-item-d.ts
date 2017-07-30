import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard'; 
import { CartProvider } from '../../providers/cart/cart';

/**
 * Generated class for the CartItemDPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-cart-item-d',
  templateUrl: 'cart-item-d.html',
})
export class CartItemDPage {

	private minDateOfDatePicker
	id: number;
	status: number;
	cart = {name: '', address: '', pickupTime: new Date().toISOString()}
	items = [];
  cartTotal = 0;

  constructor(private alertCtrl: AlertController, private cartCtrl: CartProvider, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  		this.id = this.navParams.get("cart").id;
  		this.status = this.navParams.get("cart").status;
  		this.cart.name = this.navParams.get("cart").name;
  		this.cart.address = this.navParams.get("cart").address;
  		this.cart.pickupTime = this.navParams.get("cart").pickupTime;
  		console.log(this.navParams.get("cart"));
  		let items = this.navParams.get("items");
  		for(var i = 0; i<items.length; i++){
  			this.items.push(items.item(i));
  		}

      this.cartTotal = this.getTotalPrice(this.items);

  		console.log(this.items);
  }

  public getTotalPrice(cart){
    let cartTotal = 0;
    for(var i =0; i<cart.length; i++){
      cartTotal +=cart[i].totalPrice;
    }

    return cartTotal;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartItemDPage');
  }

  dismiss(){
  	this.viewCtrl.dismiss()
  }

  markAsComplete(){
  	this.cartCtrl.markAsComplete(this.id).then( res => {
  		this.showAlertUndismissable("", "Order completed", [{
  			text: "Dismiss",
  			handler: () =>{
  				this.navCtrl.push(DashboardPage);
  			}
  		}])
  	})
  }

  showAlertUndismissable(title, message, buttons){
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: buttons,
      enableBackdropDismiss: false
    });

    alert.present();
  }

}
