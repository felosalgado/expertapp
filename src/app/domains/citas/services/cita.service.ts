import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cita } from '../interfaces/cita';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  public numberSignal = signal(10);
  public citas = signal<Cita[]>([]);
  private http = inject(HttpClient);
  private citasUrl = 'https://localhost:7031/api/Citas';
  

  getCitasApi(): void {
    this.http.get<Cita[]>(this.citasUrl)
    .subscribe(response => this.citas.set(response));
  }

  getCitasById(id: number): Observable<Cita>{
    //console.log(this.citasUrl+`/${id}`);
    return this.http.get<Cita>(this.citasUrl+`/${id}`);
    // .subscribe( response => this.selectedCita.set(response));
  }

  updateCita(cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.citasUrl}/${cita.citaId}`, cita);
  }

  createCita(cita: Cita): Observable<Cita>{
    return this.http.post<Cita>(this.citasUrl,cita);
  }

  deleteCita(id:number): Observable<Cita> {
    return this.http.delete<Cita>(`${this.citasUrl}/${id}`);
  }

}
