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
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AddUserPage } from '../add-user/add-user';
/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var DashboardPage = (function () {
    function DashboardPage(navCtrl, navParams, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.action = "users";
    }
    DashboardPage.prototype.presentAddUserModal = function () {
        var modal = this.modalCtrl.create(AddUserPage);
        modal.present();
    };
    DashboardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DashboardPage');
    };
    DashboardPage.prototype.goToLogin = function () {
        this.navCtrl.push(LoginPage);
    };
    return DashboardPage;
}());
DashboardPage = __decorate([
    Component({
        selector: 'page-dashboard',
        templateUrl: 'dashboard.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ModalController])
], DashboardPage);
export { DashboardPage };
//# sourceMappingURL=dashboard.js.map