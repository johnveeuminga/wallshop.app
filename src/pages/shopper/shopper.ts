import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, Events } from 'ionic-angular';
import { QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner';
import { BarcodeScanner} from '@ionic-native/barcode-scanner';
import { ItemProvider } from '../../providers/item/item';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { CartItemPage } from '../cart-item/cart-item';
import { CartProvider } from '../../providers/cart/cart';
import { CheckoutPage } from '../checkout/checkout';
/**
 * Generated class for the ShopperPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-shopper',
  templateUrl: 'shopper.html',
})
export class ShopperPage {

  cart = [];

  constructor(private cartCtrl: CartProvider, private events: Events, public modalCtrl: ModalController, public alertCtrl: AlertController, public itemCtrl: ItemProvider, private qrScanner: QRScanner, private barcodeScanner: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams) {

  }

  tapped = 0;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopperPage');
  }

  scanBarcode(){
  	this.barcodeScanner.scan().then((barcodeData) => {
      if(!barcodeData.cancelled){
         let item = this.itemCtrl.findByCode(barcodeData.text).then(data => {
           console.log(data);
           if (data.length == 0){
             this.showAlert("", "Item does not exist", ['DISMISS']);
           }else{
             var currentItem = data.item(0);
             this.presentCartItemModal(currentItem);
           }
        },
          error  => {
            console.log(error);
            this.showAlert("", error, ['Dismiss']);
          }); 
      }
    });
  }

  showAlert(title, message, buttons){
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: buttons
    });

    alert.present();
  }

  presentCartItemModal(item){
    let modal = this.modalCtrl.create(CartItemPage, {item: item});
    modal.present();
  }

  goToCart(){
    this.navCtrl.push(CheckoutPage);
  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }

}
