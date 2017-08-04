import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';
import { DashboardPage } from '../dashboard/dashboard';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
/**
 * Generated class for the AddUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

  data = {itemCode: '', itemDescription: '', itemPrice: ''}
  imgPath = null;
  
  constructor(private file: File, private filePath: FilePath, private fileChooser: FileChooser, public alertCtrl: AlertController, public itemCtrl: ItemProvider, public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    
  
  }

  ionViewDidLoad() {
  }

  submit(){
    this.itemCtrl.store(this.data).then(data=> {
      let foo = <any>data;
      // this.file.copyFile(path, fileName, this.file.dataDirectory, data.insertId)
      console.log(foo.insertId);
      let path = this.imgPath.substr(0, this.imgPath.lastIndexOf('/')+1);
      let fileName = this.imgPath.substr(this.imgPath.lastIndexOf('/')+1 , this.imgPath.length);
      let ext = fileName.substr(fileName.lastIndexOf('.')+1, fileName.length);
      let newFileName = foo.insertId +'.'+ ext;
      this.file.copyFile(path, fileName, this.file.dataDirectory, newFileName).then( res => {
        this.itemCtrl.setPhoto(foo.insertId, res.nativeURL).then( res => {
          console.log(res);
           this.showAlertUndismissable("Successfully added item.", "", [{
            text: 'Close',
            handler: () => {
              this.navCtrl.push(DashboardPage, {action: 'items'});
            }
          }]);
        })
      })
    },
      error  => {
          this.showAlert("Error Adding Item", error, ['DISMISS'])
      }
    ).catch( err => {
          this.showAlert("Error Adding User", err, ['DISMISS'])

    });
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }

  showAlert(title, message, buttons){
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: buttons
    });

    alert.present();
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

  chooseFile(){
    this.fileChooser.open()
      .then(uri => {
        this.filePath.resolveNativePath(uri)
          .then( res => {
            console.log(uri);
            this.imgPath = res;
            
          })
      })
      .catch(e => console.log(e))
  }



}
