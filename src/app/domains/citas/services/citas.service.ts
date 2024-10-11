import { Injectable } from '@angular/core';
import { Cita } from '../interfaces/cita.interface';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private counter: number = 3

  private citas: Cita[] = [
    { "id": 1, "titulo": "Cita con el médico general", "fecha": new Date("2024-10-08"), "hora": new Date("2024-10-08T09:00") },
    { "id": 2, "titulo": "Cita con el dentista", "fecha": new Date("2024-10-09"), "hora": new Date("2024-10-09T11:30") },
    { "id": 3, "titulo": "Cita con el oftalmólogo", "fecha": new Date("2024-10-10"), "hora": new Date("2024-10-10T13:00") },
    { "id": 4, "titulo": "Cita con el cardiólogo", "fecha": new Date("2024-10-11"), "hora": new Date("2024-10-11T15:30") },
    { "id": 5, "titulo": "Cita con el dermatólogo", "fecha": new Date("2024-10-12"), "hora": new Date("2024-10-12T10:00") },
    { "id": 6, "titulo": "Cita con el endocrinólogo", "fecha": new Date("2024-10-13"), "hora": new Date("2024-10-13T14:00") },
    { "id": 7, "titulo": "Cita con el gastroenterólogo", "fecha": new Date("2024-10-14"), "hora": new Date("2024-10-14T12:30") },
    { "id": 8, "titulo": "Cita con el psicólogo", "fecha": new Date("2024-10-15"), "hora": new Date("2024-10-15T16:00") },
    { "id": 9, "titulo": "Cita con el pediatra", "fecha": new Date("2024-10-16"), "hora": new Date("2024-10-16T08:30") },
    { "id": 10, "titulo": "Cita con el neumólogo", "fecha": new Date("2024-10-17"), "hora": new Date("2024-10-17T11:00") }
  ]; 
  

  listarCitas(): Observable<Cita[]> {
    return of(this.citas);
  }

  crearCita(cita: Cita): void {
    const nuevaCita: Cita = {  ...cita, id: this.counter++  };
    this.citas.push(nuevaCita);
  }


  eliminarCita(id: number): void {
    this.citas = this.citas.filter(cita => cita.id !== id);
    this.counter--
  }


  obtenerCitaPorId(id: number): Observable<Cita> {
    const cita = this.citas.find(c => c.id === id);
    return of(cita!);
  }

  actualizarCita(citaActualizada: Cita): Observable<void> {
    const index = this.citas.findIndex(c => c.id === citaActualizada.id);

    if (index !== -1) {
      this.citas[index] = citaActualizada;
    }

    return of(); 
  }
}
