import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { ShopperPage } from '../shopper/shopper';
import { DatePicker } from '@ionic-native/date-picker';

/**
 * Generated class for the CheckoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

	cart:any;
  private minDateOfDatePicker
	data = {name: '', address: '', pickupTime: new Date().toISOString()}
  totalPrice = 0;

  constructor(private alertCtrl:AlertController, private datePicker: DatePicker, private cartCtrl:CartProvider, public navCtrl: NavController, public navParams: NavParams) {
  	this.cart = this.cartCtrl.cart;
  	let aDate = new Date();
    aDate.setHours(aDate.getHours());
    this.minDateOfDatePicker = aDate.toISOString();
    this.data.pickupTime = aDate.toISOString();
    this.totalPrice = this.cartCtrl.getTotalPrice();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
    console.log(this.checkIfCartEmpty());
  }

  dismiss(){
  	this.navCtrl.push(ShopperPage);
  }

  remove(i){
  	var index = this.cart.items.indexOf(i);
   	this.cart.items.splice(index, 1); 
    this.cartCtrl.cart = this.cart;
  }

  checkout(){
   this.cartCtrl.create(this.data, this.cart.items)
    .then( res => {
      this.showAlertUndismissable("", "Cart successfully added", [{
        text: "Okay",
        handler: () =>{
          this.cartCtrl.cart.items = [];
          this.cart.items = [];
          this.navCtrl.push(ShopperPage);
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

  checkIfCartEmpty(){
  	if(this.cart.items.length == 0){
  		return true;
  	}
  	return false;
  }

  showDatePicker(){
  	this.datePicker.show({
  		date: new Date(),
  		mode: "datetime",
  		allowOldDates: false,
  		androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
  	}).then(
  		date => console.log(date),
  		err=>console.log(err)
  	)
  }

}
