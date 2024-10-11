import { User } from './user.model';

export interface Cita {
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
