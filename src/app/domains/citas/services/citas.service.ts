import { Injectable } from '@angular/core';
import { Cita } from '../interfaces/cita.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private citas: Cita[] = [
    { id: 1, titulo: 'Cita con el médico', fecha: new Date('2024-10-05'), hora: new Date('2024-10-05T10:30') },
    { id: 2, titulo: 'Reunión de trabajo', fecha: new Date('2024-10-06'), hora: new Date('2024-10-06T14:00') }
  ];

  listarCitas(): Observable<Cita[]> {
    return of(this.citas);
  }

  crearCita(cita: Cita): void {
    this.citas.push(cita);
  }

  actualizarCita(id: number, citaActualizada: Cita): void {
    const index = this.citas.findIndex(cita => cita.id === id);
    if (index !== -1) {
      this.citas[index] = citaActualizada;
    }
  }

  eliminarCita(id: number): void {
    this.citas = this.citas.filter(cita => cita.id !== id);
  }
}
