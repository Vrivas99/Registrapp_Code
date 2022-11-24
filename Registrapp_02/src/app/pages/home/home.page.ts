import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FirestoreService } from 'src/app/services/databases/firestore.service';
import { AsistenciaModel } from 'src/app/services/databases/models/models';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  code:any;
  
  constructor(private barcodeScanner: BarcodeScanner,private afs: FirestoreService, private EmailComposer:EmailComposer) {}

  ngOnInit(){
    this.storage();
  }

  ionViewWillEnter(){
    this.storage();
  }
  
  insertarAsistencia(idAsig,sec,asig,doc,cor){
    const date = new Date();
    const now = date.toLocaleString();
    const nuevasistencia: AsistenciaModel = {asistencia:{nombre: this.local_nombre,
                                                        dia: now,        
                                                        idAsignatura: idAsig,
                                                        seccion: sec,
                                                        asignatura: asig,
                                                        docente: doc,
                                                        correo: cor}}
    const path = 'Asistencias';
    const id = this.afs.createID();
    this.afs.createDoc(nuevasistencia,path,id).then( (res) => {
      console.log('guardado con exito',res);
    });
  }

  local_nombre: any;
  storage(){
    var var_nom = JSON.parse(localStorage.getItem('usuario'));
    this.local_nombre = var_nom.name.replace(/(?<=\S)\s\S+/, '');
  }

  async openEmail(cor){
    const date = new Date();
    const now = date.toLocaleString();
    const email: EmailComposerOptions = {
      to: cor,
      cc: '',
      subject:'Registro Asistencia',
      body: 'El alumno:\n' + 
      this.local_nombre +'\nregistro sus asistencia de clases'+ 
      '\nEl: ' + now
    };
    this.EmailComposer.open(email);
  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      /* this.code = barcodeData.text; */
      var json = JSON.parse(barcodeData.text);
      var idAsig = json['idAsignatura']
      var sec = json['seccion']
      var asig = json['asignatura']
      var doc = json['docente']
      var cor = json['correo']
      this.insertarAsistencia(idAsig,
                              sec,
                              asig,
                              doc,
                              cor);
      console.log('Barcode data', json);
      this.openEmail(cor);
    }).catch(err => {
        console.log('Error', err);
    });
  }
}
