import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,AngularFireModule.initializeApp(environment.firebaseConfig),AngularFirestoreModule, BrowserAnimationsModule,QRCodeModule],
  providers: [BarcodeScanner,EmailComposer,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
