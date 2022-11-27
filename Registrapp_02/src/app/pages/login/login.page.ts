import { Component, OnInit, ɵɵtextInterpolate1 } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuariosAPIService } from 'src/app/services/apis/usuarios-api.service';
import { FirestoreService } from 'src/app/services/databases/firestore.service';
import { UserModel } from 'src/app/services/databases/models/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private api: UsuariosAPIService,
    private router: Router,
    private afs: FirestoreService,
    private alt: AlertController
  ) {}

  //ciclos de vida
  ngOnInit() {}
  ionViewWillEnter() {
    this.getUsers();
  }

  //get de la API [recupero los usuarios en el json y los guardo]
  api_users: any;
  getUsers() {
    this.api.getUsers().subscribe((data) => {
      this.api_users = Object.values(data);
      console.log(this.api_users);
    });
  }
  //alertaa script
  async presentAlert() {
    const alert = await this.alt.create({
      header: 'Alerta',
      subHeader: 'Inputs Vacios',
      message: 'Debes ingresar datos en las casillas para poder ingresar',
      buttons: ['OK'],
    });

    await alert.present();
  }



  //validar cualquier variable pasada como no vacia [le otorgo despues los inputs de la visual a esto]
  validarObjeto(model: any) {
    model.username;
    model.password;
    if (
      model.username == null ||
      model.password == null ||
      model.username == '' ||
      model.password == ''
    ) {
      this.presentAlert();
      return true;
    } else {
      return false;
    }
  }

  //navegar al recovery [ir a page recovery]
  recuperar() {
    this.router.navigate(['/recovery']);
  }

  //navegar al home [valido los inputs, despues los comparo con los usuarios de la api]
  visual_input: any = { id: null, nombre: '', username: '', password: '' };
  iniciarsesion() {
    if (this.validarObjeto(this.visual_input) === false) {
      for (let i = 1; i < this.api_users.length; i++) {
        if (this.visual_input.username == this.api_users[i].username) {
          var valid_user=true;
          if (this.visual_input.password == this.api_users[i].password) {
            var valid_pass=true;
            console.log('Found Username: ' + this.api_users[i].username);
            console.log('Found Password: ' + this.api_users[i].password);
            var usuario = {
              username: this.visual_input.username,
              password: this.visual_input.password,
              name: this.api_users[i].nombre,
            };
            localStorage.setItem('usuario', JSON.stringify(usuario));
            localStorage.setItem('loged', 'true');

            const nuevousuario: UserModel = {
              usuario: {
                id: this.api_users[i].id,
                nombre: this.api_users[i].nombre,
                username: this.api_users[i].username,
                password: this.api_users[i].password,
              },
            };
            const path = 'Usuarios';
            this.afs.updateDco(nuevousuario,path,'usuarioactual').then((res)=>{})
            this.afs.createDoc(nuevousuario, path, 'usuarioactual').then((res) => {
              console.log('guardado con exito', res);
            });
            this.router.navigate(['/home']);
            break;
          }else{
            valid_pass=false
          }
        }else{
          valid_user=false;
        }
      }
      if (valid_user==false || valid_pass==false) {
        console.log("X usuario no valido X")
        const fail = document.getElementById('error');
        const inp = document.getElementById('lb1');
        const inp2 = document.getElementById('lb2');
        inp.style.color = 'rgb(255, 50, 50)';
        inp2.style.color = 'rgb(255, 50, 50)';
        fail.style.display = 'block';
        //rgb(255, 50, 50)
      } else {
        const fail = document.getElementById('error');
        const inp = document.getElementById('lb1');
        const inp2 = document.getElementById('lb2');
        inp.style.color = '#fff';
        inp2.style.color = '#fff';
        fail.style.display = 'none';
      }
    }
  }
}
