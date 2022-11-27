import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/databases/firestore.service';
import { AsistenciaModel, UserModel } from 'src/app/services/databases/models/models';
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
    this.afs.getCollection<UserModel>('Usuarios').subscribe((res)=>{
      var var_nom=res[0].usuario.nombre
      this.local_nombre = var_nom.replace(/(?<=\S)\s\S+/, '');
      this.recuperarAsistencia();
    });
  }

  //funcion get en la bd de firebase para filtrar por el nombre de usuario el dato
  asistenciaspef=[];
  asistenciafill1=[];
  asistenciafill2=[];
  asistenciafill3=[];
  recuperarAsistencia(){
    this.afs.getCollection<AsistenciaModel>('Asistencias').subscribe((res)=>{
      console.log('BD cargada estos son todos los datos :',res);
      this.asistenciaspef.length=0;
      this.asistenciafill1.length=0;
      this.asistenciafill2.length=0;
      this.asistenciafill3.length=0;
      for (let index = 0; index < res.length; index++) {
        if (res[index].asistencia.nombre==this.local_nombre) {
          this.asistenciaspef.push(res[index]);
          console.log('this.asistenciaspef encontrada: ', this.asistenciaspef)
        }
      }
      for (let index = 0; index < this.asistenciaspef.length; index++) {
        if (this.asistenciaspef[index].asistencia.idAsignatura=='PGY10101') {
          this.asistenciafill1.push(this.asistenciaspef[index]);
          console.log('asistenciafill1: ',this.asistenciafill1);
        } else 
        if (this.asistenciaspef[index].asistencia.idAsignatura=='EST20202') {
          this.asistenciafill2.push(this.asistenciaspef[index]);
        }
          else 
        if (this.asistenciaspef[index].asistencia.idAsignatura=='PRT30303') {
          this.asistenciafill3.push(this.asistenciaspef[index]);
        }
      }
    });
  }

  //funcion para limpiar el array que contiene los datos de la bd que se muestra en la visual
  limpiarAsistencias(){
    this.asistenciaspef.length=0;
  }

  //funcion para regresar al login
  regresar(){
    localStorage.removeItem('loged');
    this.router.navigate(['/login']);
  }
}
