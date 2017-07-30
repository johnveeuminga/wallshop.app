var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthServiceProvider } from '../auth-service/auth-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var UserProvider = (function () {
    function UserProvider(auth, http) {
        this.auth = auth;
        this.http = http;
        this.url = '';
        this.headers = new Headers({
            "Accept": "application/json",
        });
        console.log('Hello UserProvider Provider');
    }
    UserProvider.prototype.index = function () {
        this.url = "http://192.168.56.1:8000/api/users";
        return this.http.get(this.url, {}).map(function (res) { return res.json(); });
    };
    UserProvider.prototype.store = function (data) {
        this.url = "http://192.168.56.1:8000/api/users";
        console.log(JSON.stringify(data));
        return this.http.post(this.url, data, {
            headers: this.headers
        }).map(function (res) { return res.json(); })
            .catch(function (error) { return Observable.throw(error.json().error || 'Server error'); });
    };
    return UserProvider;
}());
UserProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthServiceProvider, Http])
], UserProvider);
export { UserProvider };
//# sourceMappingURL=user.js.map