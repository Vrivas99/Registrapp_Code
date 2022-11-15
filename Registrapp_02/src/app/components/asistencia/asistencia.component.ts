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
}
