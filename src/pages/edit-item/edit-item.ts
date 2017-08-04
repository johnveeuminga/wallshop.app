import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import { ItemProvider } from '../../providers/item/item';
import { DashboardPage } from '../dashboard/dashboard';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

/**
 * Generated class for the EditUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {

	id: number;
  data:any = {};
  imgPath = "";

  constructor(private file: File, private filePath: FilePath, private fileChooser: FileChooser, public alertCtrl: AlertController, public itemCtrl: ItemProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  	this.id = navParams.get('id');

  	this.itemCtrl.show(this.id).then(data => {
      this.data = data.data;
      
    });
    console.log(this.imgPath);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserPage');
  }

  dismiss(){
  	this.viewCtrl.dismiss();
  }

  submit(){
  	this.itemCtrl.update(this.id, this.data).then(data => {
      let fileName = this.data.photoPath.substr(this.data.photoPath.lastIndexOf('/')+1, this.data.photoPath.length);
      console.log(fileName);
      this.file.removeFile(this.file.dataDirectory, fileName).then( res =>{
        let path = this.imgPath.substr(0, this.imgPath.lastIndexOf('/')+1);
        let newFileName = this.imgPath.substr(this.imgPath.lastIndexOf('/')+1 , this.imgPath.length);
        let ext = newFileName.substr(newFileName.lastIndexOf('.')+1, newFileName.length);
        let editFileName = this.id + '.' + ext;
        console.log(path);
        console.log(newFileName);
        console.log(ext);
        console.log(editFileName);
        this.file.copyFile(path, newFileName, this.file.dataDirectory, editFileName).then( res => {
          console.log(res);
          return res;
        }).catch( e => {
          console.log(e);
        });
      }).catch( e => {
        console.log(e + "deletion");
      })
  		this.showAlertUndismissable("Successfully updated item.", data.message, [{
  		  text: 'Close',
  		  handler: () => {
  		    this.navCtrl.push(DashboardPage, {action: 'items'});
  		  }
  		}]);
  	},
	  	error  => {
	  	  let mess: string ="";
	  	  var arr = Object.keys(error).map(key => error[key]);
	  	  arr.forEach(function(r){
	  	    mess += '<p>' + r + '<p>';
	  	  });
	  	  this.showAlert("Error updating item.", mess, ['Dismiss']);
	  	}
	  	);
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
