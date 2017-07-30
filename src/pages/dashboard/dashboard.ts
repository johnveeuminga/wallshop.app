import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,MenuController, ActionSheetController } from 'ionic-angular';
import { LoginPage} from '../login/login'; 
import { UserComponent } from '../../components/user/user';
import { ItemComponent } from '../../components/item/item';
import { CartComponent } from '../../components/cart/cart';
import { AddUserPage } from '../add-user/add-user';
import { AddItemPage } from '../add-item/add-item';
import { HomePage } from '../home/home';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

    rootPage = DashboardPage;
	action: any;
  constructor(private auth: AuthServiceProvider, private actionCtrl:ActionSheetController, private menu: MenuController, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    if(this.navParams.get('action') == "items"){
      this.action = "items";
    }else if(this.navParams.get('action') == "users"){
      this.action = "users";
    }else{
      this.action = "orders";
    }

    this.menu.enable(true);
  }

  presentActionSheet(){
    let actionSheet = this.actionCtrl.create({
      title: "Menu",
      buttons: [
      {
        text: "Home",
        handler: () =>{
          this.navCtrl.push(HomePage);
        }
      },
      {
        text: "Logout",
        handler: () => {
          this.auth.logout();
          this.navCtrl.push(HomePage);
        }
      }]
    })

    actionSheet.present();
  }

  presentAddUserModal(){
  	let modal = this.modalCtrl.create(AddUserPage);
  	modal.present();
  }

  presentAddItemModal(){
    let modal = this.modalCtrl.create(AddItemPage);
    modal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  goToLogin(){
  	this.navCtrl.push(LoginPage);
  }
}
