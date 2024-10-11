import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../interfaces/cita';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cita',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cita.component.html',
  styleUrl: './cita.component.sass'
})
export class CitaComponent implements OnInit {
  citas: Cita[] = [];

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.citas = this.citaService.obtenerCitas();  
  }
}
