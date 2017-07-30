var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the AddUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AddUserPage = (function () {
    function AddUserPage(userCtrl, navCtrl, navParams, viewCtrl) {
        this.userCtrl = userCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.data = { name: '', username: '', password: '', confirm_password: '' };
    }
    AddUserPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddUserPage');
    };
    AddUserPage.prototype.submit = function () {
        console.log(this.data);
        this.userCtrl.store(this.data).subscribe(function (data) {
            console.log(data);
        });
    };
    AddUserPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return AddUserPage;
}());
AddUserPage = __decorate([
    Component({
        selector: 'page-add-user',
        templateUrl: 'add-user.html',
    }),
    __metadata("design:paramtypes", [UserProvider, NavController, NavParams, ViewController])
], AddUserPage);
export { AddUserPage };
//# sourceMappingURL=add-user.js.map