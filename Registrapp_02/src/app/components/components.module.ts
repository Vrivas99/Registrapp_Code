import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { HomeComponent } from './home/home.component';
import {MatIconModule} from '@angular/material/icon';

/*
Utilizo referencia a los componentes por medio del selector. Por esto
necesito generar este archivo, acá agrego la referencia a todos los componentes que utilizaré
*/

@NgModule({
    declarations: [AsistenciaComponent,HomeComponent],
    exports:[AsistenciaComponent,HomeComponent],//Se exporta para poder llamar los components desde los tabs
    imports: [
    CommonModule,
    IonicModule,
    MatIconModule
    ]
})
export class ComponentsModule { }