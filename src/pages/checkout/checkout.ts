import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events} from 'ionic-angular';
import { CartProvider } from '../../providers/cart/cart';
import { ShopperPage } from '../shopper/shopper';
import { DatePicker } from '@ionic-native/date-picker';
import { CartItemEditPage } from '../cart-item-edit/cart-item-edit'
import { ShopperProvider } from '../../providers/shopper/shopper'
import { ConfirmPage }from '../confirm/confirm'


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
	data = {name: '', address: '', pickupTime: new Date().toISOString(), id:null}
  totalPrice = 0;

  constructor(private shopper: ShopperProvider, private alertCtrl:AlertController, private datePicker: DatePicker, private cartCtrl:CartProvider, public navCtrl: NavController, public navParams: NavParams) {
  	this.cart = this.cartCtrl.cart;
    let aDate = new Date();
    this.data.id = this.shopper.shopper.id;
    aDate.setHours(aDate.getHours());
    this.minDateOfDatePicker = aDate.toISOString();
    this.data.pickupTime = aDate.toISOString();
    this.setPrice();
  }

  setPrice(){
    this.totalPrice = this.cartCtrl.getTotalPrice();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage');
    console.log(this.checkIfCartEmpty());
  }

  ionViewDidLeave() {
  }

  dismiss(){
  	this.navCtrl.push(ShopperPage);
  }

  remove(i){
  	var index = this.cart.items.indexOf(i);
   	this.cart.items.splice(index, 1); 
    this.cartCtrl.cart = this.cart;
    this.setPrice();
    
  }

  checkout(){
   this.cartCtrl.create(this.data, this.cart.items)
    .then( res => {
      let code = (this.cartCtrl.genAuthCode(res.id));
      this.cartCtrl.setAuthCode(res.id, code).then(res => {
        this.navCtrl.push(ConfirmPage, {code: code});
      })
      // this.showAlertUndismissable("", "Cart successfully added", [{
      //   text: "Okay",
      //   handler: () =>{
      //     this.cartCtrl.cart.items = [];
      //     this.cart.items = [];
      //     this.navCtrl.push(ShopperPage);
      //   }
      // }])
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

  goToShopper(){
    this.navCtrl.push(ShopperPage);
  }

  editCartItem(item, index){
    console.log(item);
    this.navCtrl.push(CartItemEditPage, {item: item, index:index});
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
