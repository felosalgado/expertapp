import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../../models/Cita.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CitaService {
    private baseUrl = `${environment.apiUrl}/cita`;

    constructor(private http: HttpClient) { }

    // Obtener todas las citas
    getAllCitas(): Observable<Cita[]> {
        return this.http.get<Cita[]>(`${this.baseUrl}`);
    }

    // Obtener cita por ID
    getCitaById(id: number): Observable<Cita> {
        return this.http.get<Cita>(`${this.baseUrl}/${id}`);
    }

    // Crear nueva cita
    createCita(Cita: Cita): Observable<Cita> {
        return this.http.post<Cita>(this.baseUrl, Cita);
    }

    // Actualizar cita existente
    updateCita(id: number, Cita: Cita): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, Cita);
    }

    // Eliminar cita por ID
    deleteCita(id: number): Observable<void> {
        alert(id)
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
