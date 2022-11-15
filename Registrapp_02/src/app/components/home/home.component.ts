import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/databases/firestore.service';
import { AsistenciaModel } from 'src/app/services/databases/models/models';
@Component({
  selector: 'comp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,private afs: FirestoreService) { }
  //ciclos de vida
  //Se ejecuta la funcion del nombre por 1mera vez
  ngOnInit(){
    this.storage();
    this.recuperarAsistencia();
  }
  //limpiamos el array que usamos para mostrar la bd
  ionViewWillLeave(){
    this.limpiarAsistencias();
  }
  
  //funcion para recuperar el nombre del login
  local_nombre: any;
  storage(){
    var var_nom = JSON.parse(localStorage.getItem('usuario'));
    this.local_nombre = var_nom.name.replace(/(?<=\S)\s\S+/, '');
  }

  //funcion get en la bd de firebase para filtrar por el nombre de usuario el dato
  asistenciaspef=[];
  recuperarAsistencia(){
    this.afs.getCollection<AsistenciaModel>('Asistencias').subscribe((res)=>{
      console.log('BD cargada estos son todos los datos :',res);
      this.asistenciaspef.length=0;
      for (let index = 0; index < res.length; index++) {
        if (res[index].asistencia.nombre==this.local_nombre) {
          this.asistenciaspef.push(res[index]);
          console.log('this.asistenciaspef encontrada: ', this.asistenciaspef)
        }
      }
    });
  }

  //funcion para limpiar el array que contiene los datos de la bd que se muestra en la visual
  limpiarAsistencias(){
    this.asistenciaspef.length=0;
  }
  
  //funcion para insertar una asistencia a firebase
  insertarAsistencia(){
    const date = new Date();
    const now = date.toLocaleString();
    const nuevasistencia: AsistenciaModel = {asistencia:{nombre: this.local_nombre,dia: now }}
    const path = 'Asistencias';
    const id = this.afs.createID();
    this.afs.createDoc(nuevasistencia,path,id).then( (res) => {
      console.log('guardado con exito',res);
    });
  }

  //funcion para regresar al login
  regresar(){
    localStorage.removeItem('loged');
    this.router.navigate(['/login']);
    
  }
}
