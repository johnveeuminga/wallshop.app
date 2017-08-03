import { Component } from '@angular/core';
import { NavController, NavParams, Loading, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DashboardPage } from '../dashboard/dashboard';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor( private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider) {
  }

  loading: Loading;
  credentials = {username: '', password :''};

  ionViewCanEnter(){
    if(!this.auth.getUserInfo()){
      return true;
    }else{
      return false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  public login(){
    this.auth.login(this.credentials).then(res => {
      this.navCtrl.push(DashboardPage, {
        canGoBack: false
      })
    }).catch( err => {
      this.showAlert("", err, ['Dismiss']);
    })
  }

  showAlert(title, message, buttons){
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: buttons
    });

    alert.present();
  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }

}
