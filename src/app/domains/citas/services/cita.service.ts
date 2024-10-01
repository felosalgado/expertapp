import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private http = inject(HttpClient)

  constructor() { }
}
