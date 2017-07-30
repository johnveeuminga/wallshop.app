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
import { UserProvider } from '../../providers/user/user';
/**
 * Generated class for the UserComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
var UserComponent = (function () {
    function UserComponent(user) {
        this.user = user;
        this.users = [];
        this.index();
    }
    UserComponent.prototype.index = function () {
        var _this = this;
        this.user.index().subscribe(function (data) {
            _this.users = data.data;
            console.log(data.data);
            // console.log(this.users);
        });
    };
    return UserComponent;
}());
UserComponent = __decorate([
    Component({
        selector: 'user',
        templateUrl: 'user.html'
    }),
    __metadata("design:paramtypes", [UserProvider])
], UserComponent);
export { UserComponent };
//# sourceMappingURL=user.js.map