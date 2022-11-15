import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FirestoreService } from 'src/app/services/databases/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  code:any;

  constructor(private barcodeScanner: BarcodeScanner,private router: Router,private afs: FirestoreService) {}

  ngOnInit(){
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text;
    /*const date = new Date(); 
      this.servicioBD.addAsistencia(this.code, date.toLocaleString());
      this.servicioBD.presentToast("asist Agregada"); */
      console.log('Barcode data', this.code);
    }).catch(err => {
        console.log('Error', err);
    });
  }
}
