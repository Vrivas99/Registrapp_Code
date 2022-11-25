export interface AsistenciaModel {
  asistencia: {
    nombre: string;
    dia: string;
    idAsignatura: string;
    seccion: string;
    asignatura: string;
    docente: string;
    correo: string;
  };
}
export interface UserModel {
  usuario: {
    id: string;
    nombre: string;
    username: string;
    password: string;
  };
}
