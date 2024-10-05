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


  eliminarCita(id: number): void {
    this.citas = this.citas.filter(cita => cita.id !== id);
  }


  // Obtener una cita por su ID
  obtenerCitaPorId(id: number): Observable<Cita> {
    const cita = this.citas.find(c => c.id === id);
    return of(cita!);
  }

  // Método para actualizar una cita en memoria
  actualizarCita(citaActualizada: Cita): Observable<void> {
    const index = this.citas.findIndex(c => c.id === citaActualizada.id);

    if (index !== -1) {
      // Actualizamos los datos de la cita en memoria
      this.citas[index] = citaActualizada;
    }

    return of(); // Retornamos un observable vacío como confirmación
  }
}
