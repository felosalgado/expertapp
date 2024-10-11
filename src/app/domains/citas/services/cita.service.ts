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

  private simularApiCitas(): void {
    const mockCitas: Cita[] = [
      { citaId: 1, usuarioId: 1, fechaCita: new Date('2024-10-10'), descripcion: 'Consulta general', lugar: 'Caucasia', estado: 'Asistida', fechaCreacion: new Date('2024-10-03'), fechaModificacion: new Date('2024-10-03')},
      { citaId: 2, usuarioId: 2, fechaCita: new Date('2024-10-15'), descripcion: 'Consulta general', lugar: 'Medellín', estado: 'Pendiente', fechaCreacion: new Date('2024-10-03'), fechaModificacion: new Date('2024-10-03')}
    ];
    this.citas.set(mockCitas);
  }

  obtenerCitas(): Cita[] {
    return this.citas();
  }

  agregarCita(citaNueva: Cita): void {
    const citasActualizadas = [...this.citas(), citaNueva];
    this.citas.set(citasActualizadas);
  }

  actualizarCita(citaActualizada: Cita): void {
    const citasActualizadas = this.citas().map(cita =>
      cita.citaId === citaActualizada.citaId ? citaActualizada : cita      
    );
    this.citas.set(citasActualizadas);
  }

  eliminarCita(citaId: number): void {
    const citasActualizadas = this.citas().filter(cita => cita.citaId !== citaId);
    this.citas.set(citasActualizadas);  
  }
}


