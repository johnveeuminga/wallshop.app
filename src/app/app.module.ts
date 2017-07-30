import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { QRScanner } from '@ionic-native/qr-scanner';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite, SQLiteDatabaseConfig , SQLiteObject } from '@ionic-native/sqlite';
import { DatePicker } from '@ionic-native/date-picker'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage} from '../pages/login/login';
import { ShopperPage } from '../pages/shopper/shopper';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AddUserPage } from '../pages/add-user/add-user';
import { EditUserPage } from '../pages/edit-user/edit-user';
import { AddItemPage } from '../pages/add-item/add-item';
import { EditItemPage } from '../pages/edit-item/edit-item';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UserProvider } from '../providers/user/user';
import { UserComponent } from '../components/user/user';
import { KeysPipe } from '../pipes/keys/keys';
import { ItemComponent } from '../components/item/item';
import { ItemProvider } from '../providers/item/item';
import { CartItemPage } from '../pages/cart-item/cart-item';
import { CartItemProvider } from '../providers/cart-item/cart-item';
import { CartProvider } from '../providers/cart/cart';
import { DatabaseProvider } from '../providers/database/database';
import { CheckoutPage } from '../pages/checkout/checkout';
import { CartItemDPage } from '../pages/cart-item-d/cart-item-d';


import { IonicStorageModule } from '@ionic/storage';
import { CartComponent } from '../components/cart/cart';

class BarcodeScannerMock extends BarcodeScanner{
  scan(){
    return new Promise((resolve, reject) => {
      resolve({cancelled: false, text: "001", format: "QR_CODE"});
    })
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ShopperPage,
    DashboardPage,
    AddUserPage,
    EditUserPage,
    AddItemPage,
    EditItemPage,
    UserComponent,
    KeysPipe,
    ItemComponent,
    CartItemPage,
    CheckoutPage,
    CartComponent,
    CartItemDPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ShopperPage,
    DashboardPage,
    AddUserPage,
    EditUserPage,
    AddItemPage,
    EditItemPage,
    CartItemPage,
    CheckoutPage,
    CartItemDPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    UserProvider,
    QRScanner,
    UserProvider,
    ItemProvider,
    // { provide: BarcodeScanner, useClass: BarcodeScannerMock },
    BarcodeScanner,
    CartItemProvider,
    CartProvider,
    DatabaseProvider,
    SQLitePorter,
    SQLite,
    DatePicker
  ]
})
export class AppModule {}
