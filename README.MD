Repositorio de IONIC/Angular con BD Firebase

Librerias
1. Instalacion de Firebase 
        url: https://github.com/angular/angularfire/blob/master/docs/ionic/cli.md
    comando: npm install @angular/fire firebase --save 
2. Instalacion de Angularx-qrcode 
        url: https://github.com/Cordobo/angularx-qrcode
    comando: npm install angularx-qrcode@14.0.0 --save

Modulos importados en app.module.ts
1. HttpClientModule : no me acuerdo para que lo importe pero esta ahi
2. AngularFireModule: importante para usar firebase , se coloca en imports y le pasamos enviroments donde tenemos los datos de la database.
3. AngularFirestoreModule: modulo de la base de datos Firestore (no la realtime)
4. QRCodeModule : modulo del generador de codigos qr, se improta en el appmodule del componente donde se esta usando.