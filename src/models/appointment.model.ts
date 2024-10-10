import { User } from './user.model';

export interface Appointment {
    citaID: number;
    usuarioID: number;
    fechaCita: Date;
    descripcion: string;
    lugar: string;
    estado: string;
    fechaCreacion: Date;
    fechaModificacion?: Date;
    user: User;
  }