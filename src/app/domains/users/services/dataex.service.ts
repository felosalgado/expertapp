import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataexService {
    private http = inject(HttpClient);
    data = signal<any>(null); // Signal para almacenar los datos

    fetchData() {
      this.http.get<any>('https://localhost:7031/api/Users')
        .subscribe(response => this.data.set(response)); // Actualizamos el signal
    }
}
