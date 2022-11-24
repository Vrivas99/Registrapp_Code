import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'comp-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss'],
})
export class AsistenciaComponent implements OnInit {

  constructor(private router: Router,private _location: Location) { }


  ngOnInit() {}

  regresar(){
    localStorage.removeItem('loged');
    this.router.navigate(['/login']);

  }

  AngularxQrcode: string=null;
  //programazao
  generarQRprog(){
    this.AngularxQrcode = '{"idAsignatura":"PGY10101","seccion":"001D","asignatura":"Programacion","docente":"Yaravi Villegas","correo":"yav.villegas@duoc.profes.cl"}';
  }
  //estadistica
  generarQResta(){
    this.AngularxQrcode = '{"idAsignatura":"EST20202","seccion":"002D","asignatura":"Estadistica","docente":"Johan","correo":"johan@duoc.profes.cl"}';
  }
  //portafolio
  generarQRport(){
    this.AngularxQrcode = '{"idAsignatura":"PRT30303","seccion":"003D","asignatura":"Portafolio","docente":"Hernan Pinochet","correo":"her.pinochet@duoc.profes.cl"}';
  }
}
