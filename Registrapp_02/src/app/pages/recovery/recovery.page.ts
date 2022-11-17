import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.page.html',
  styleUrls: ['./recovery.page.scss'],
})
export class RecoveryPage implements OnInit {
  inputEmail: "";
  constructor(private router:Router, private EmailComposer:EmailComposer) {

  }

  ngOnInit() {
  }

  regresar(){this.router.navigate(['/login']);}

  
  async openEmail(){
    const email: EmailComposerOptions = {
      to: this.inputEmail,
      cc: 'jo.casas@duocuc.cl',
      subject:'prueba',
      body: 'testeando el correito'
    };
    this.EmailComposer.open(email);
  }

}
