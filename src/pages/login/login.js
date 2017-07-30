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
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DashboardPage } from '../dashboard/dashboard';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, auth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.credentials = { username: '', password: '' };
    }
    LoginPage.prototype.ionViewCanEnter = function () {
        if (!this.auth.getUserInfo()) {
            return true;
        }
        else {
            return false;
        }
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.auth.login(this.credentials).subscribe(function (data) {
            var body = data.json();
            if (data.status == 200) {
                _this.auth.getAuthUser(body.access_token).subscribe(function (data) {
                    if (data.status == 200) {
                        var user = data.json();
                        _this.auth.setUser(user.id, user.name, user.usertype, body.access_token, body.refresh_token);
                        console.log(_this.auth.getUserInfo());
                        _this.navCtrl.push(DashboardPage);
                    }
                });
            }
            else {
                (function (error) {
                    console.log(error);
                });
            }
        }, function (error) {
            console.log(error);
        });
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AuthServiceProvider])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map