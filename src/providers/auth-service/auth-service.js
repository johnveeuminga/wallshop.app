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
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var User = (function () {
    function User(id, name, username, access_token, refresh_token) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.access_token = access_token,
            this.refresh_token = refresh_token;
    }
    return User;
}());
export { User };
var AuthServiceProvider = (function () {
    function AuthServiceProvider(http) {
        this.http = http;
        this.url = "http://192.168.56.1:8000/oauth/token";
        this.userUrl = "http://192.168.56.1:8000/api/user";
        this.dataHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        };
    }
    AuthServiceProvider.prototype.login = function (credentials) {
        var headers = new Headers(this.dataHeader);
        var response;
        if (credentials.username === null || credentials.password === null) {
            return Observable.throw("Please insert credentials.");
        }
        else {
            var postData = {
                grant_type: "password",
                client_id: "1",
                client_secret: "wallshop",
                username: credentials.username,
                password: credentials.password,
                scope: ""
            };
            return response = this.http.post(this.url, JSON.stringify(postData), {
                headers: headers
            }).map(function (res) { return res; });
        }
        // .catch((error: any) => Observable.throw(error.json().error || 'Server error'));		}
    };
    AuthServiceProvider.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    AuthServiceProvider.prototype.getAuthUser = function (accessToken) {
        var headers = new Headers({
            "Accept": "application/json",
            "Authorization": "Bearer " + accessToken,
        });
        return this.http.get(this.userUrl, {
            headers: headers
        }).map(function (res) { return res; });
    };
    AuthServiceProvider.prototype.setUser = function (id, name, username, access_token, refresh_token) {
        this.currentUser = new User(id, name, username, access_token, refresh_token);
    };
    AuthServiceProvider.prototype.setTokens = function (accessToken, refreshToken) {
        this.currentUser.access_token = accessToken;
        this.currentUser.refresh_token = refreshToken;
    };
    AuthServiceProvider.prototype.setRefreshToken = function (refreshToken) {
        this.getUserInfo().refresh_token = refreshToken;
    };
    return AuthServiceProvider;
}());
AuthServiceProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], AuthServiceProvider);
export { AuthServiceProvider };
//# sourceMappingURL=auth-service.js.map