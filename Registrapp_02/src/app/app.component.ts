import { Component } from '@angular/core';
import { SplashComponent } from './components/splash/splash.component';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private modalController: ModalController) {
    this.initializeApp();
  }

  async initializeApp(){
    const modal = await this.modalController.create({
      component: SplashComponent
    });
    return await modal.present();
  }
}
