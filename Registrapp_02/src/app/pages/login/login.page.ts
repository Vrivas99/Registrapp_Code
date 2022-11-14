import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosAPIService } from 'src/app/services/apis/usuarios-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private api: UsuariosAPIService,
              private router: Router) { }
  //ciclos de vida
  ngOnInit() {}
  ionViewWillEnter(){this.getUsers();}

  //get de la API [recupero los usuarios en el json y los guardo]
  api_users:any;
  getUsers(){this.api.getUsers().subscribe((data)=>{this.api_users = Object.values(data);console.log(this.api_users);});}
  
  //validar cualquier variable pasada como no vacia [le otorgo despues los inputs de la visual a esto]
  validarObjeto(model: any){
    model.username; model.password;
    if(model.username==null || model.password==null
     ||model.username==""   || model.password==""){
      return true; }else{ return false;}
    }

  //navegar al recovery [ir a page recovery]
  recuperar(){this.router.navigate(['/recovery']);}

  //navegar al home [valido los inputs, despues los comparo con los usuarios de la api]
  visual_input:any={id:null,nombre:"",username:"",password:""}
  iniciarsesion(){
    if(this.validarObjeto(this.visual_input)===false){
      for(let i = 1; i < this.api_users.length; i++){
        if(this.visual_input.username==this.api_users[i].username){
          if(this.visual_input.password==this.api_users[i].password){
            console.log("Found Username: "+this.api_users[i].username);
            console.log("Found Password: "+this.api_users[i].password);
            var usuario = {username:this.visual_input.username,
                           password:this.visual_input.password,
                           name:this.api_users[i].nombre};
            localStorage.setItem('usuario',JSON.stringify(usuario));
            localStorage.setItem('loged','true');
            this.router.navigate(['/home']);
            break;          
          }
        }
      }
    }
  }
}
