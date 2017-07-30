var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { QRScanner } from '@ionic-native/qr-scanner';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ShopperPage } from '../pages/shopper/shopper';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AddUserPage } from '../pages/add-user/add-user';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UserProvider } from '../providers/user/user';
import { UserComponent } from '../components/user/user';
import { KeysPipe } from '../pipes/keys/keys';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            HomePage,
            LoginPage,
            ShopperPage,
            DashboardPage,
            AddUserPage,
            UserComponent,
            KeysPipe
        ],
        imports: [
            BrowserModule,
            IonicModule.forRoot(MyApp),
            HttpModule
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            HomePage,
            LoginPage,
            ShopperPage,
            DashboardPage,
            AddUserPage
        ],
        providers: [
            StatusBar,
            SplashScreen,
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            AuthServiceProvider,
            UserProvider,
            QRScanner,
            UserProvider
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map