import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../../models/appointment.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private baseUrl = `${environment.apiUrl}/cita`;

    constructor(private http: HttpClient) { }

    // Obtener todas las citas
    getAllAppointments(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(`${this.baseUrl}`);
    }

    // Obtener cita por ID
    getAppointmentById(id: number): Observable<Appointment> {
        return this.http.get<Appointment>(`${this.baseUrl}/${id}`);
    }

    // Crear nueva cita
    createAppointment(appointment: Appointment): Observable<Appointment> {
        return this.http.post<Appointment>(this.baseUrl, appointment);
    }

    // Actualizar cita existente
    updateAppointment(id: number, appointment: Appointment): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, appointment);
    }

    // Eliminar cita por ID
    deleteAppointment(id: number): Observable<void> {
        alert(id)
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
