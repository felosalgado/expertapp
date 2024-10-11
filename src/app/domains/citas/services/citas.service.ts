import { Injectable, signal } from '@angular/core';
import { Cita } from '../interfaces/cita';

@Injectable({
  providedIn: 'root'
})

export class CitaService {
  private citas = signal<Cita[]>([]);

  constructor() {
    this.simularApiCitas();
   }

   // Simulación de la llamada a una API para obtener citas
  private simularApiCitas(): void {
    const mockCitas: Cita[] = [
      { idCita: 1, idUsuario: 1, fechaCita: new Date(), descipcion: 'cita numero uno', lugar: 'Bogotá', estado: 'activo', fechaCreacion: new Date(), fechaModificacion: new Date()  },
      { idCita: 2, idUsuario: 2, fechaCita: new Date(), descipcion: 'cita numero dos', lugar: 'Bogotá', estado: 'activo', fechaCreacion: new Date(), fechaModificacion: new Date()  }
    ];
    this.citas.set(mockCitas);
  }

  // Obtener citas directamente del signal
  getCitas(): Cita[] {
    return this.citas();
  }

  // Simulación de la inserción de un nuevo cita
  agregarCita(nuevoCita: Cita): void {
    const citasActualizados = [...this.citas(), nuevoCita];
    this.citas.set(citasActualizados);
  }

  // Actualizar un cita
  actualizarCita(updatedCita: Cita): void {
    const citasActualizados = this.citas().map(cita =>
      cita.idCita === updatedCita.idCita ? updatedCita : cita
      
    );
    this.citas.set(citasActualizados);
  }

  eliminarCita(idCita: number): void {
    const citasActualizados = this.citas().filter(cita => cita.idCita !== idCita);
    this.citas.set(citasActualizados);  // Actualiza el signal con la lista filtrada
  }
}
