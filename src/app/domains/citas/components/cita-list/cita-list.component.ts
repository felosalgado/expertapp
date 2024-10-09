import { Component, inject, OnInit, signal } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../interfaces/cita';
import { DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cita-list',
  standalone: true,
  imports: [JsonPipe, NgIf, NgFor, DatePipe, RouterModule],
  templateUrl: './cita-list.component.html',
  styleUrl: './cita-list.component.sass'
})
export class CitaListComponent implements OnInit {

  public citaService = inject(CitaService);
  

  get citas() {
    return this.citaService.citas;
  } 

  ngOnInit(): void {
    this.citaService.getCitasApi();
  }
}
