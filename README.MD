Repositorio de IONIC/Angular con BD Firebase

Librerias
1. Instalacion de Firebase 
        url: https://github.com/angular/angularfire/blob/master/docs/ionic/cli.md
    comando: npm install @angular/fire firebase --save 
2. 

Modulos importados en app.module.ts
1. HttpClientModule : no me acuerdo para que lo importe pero esta ahi
2. AngularFireModule: importante para usar firebase , se coloca en imports y le pasamos enviroments donde tenemos los datos de la database.
3. AngularFirestoreModule: modulo de la base de datos Firestore (no la realtime)