import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../interfaces/cita';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cita-eliminar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cita-eliminar.component.html',
  styleUrl: './cita-eliminar.component.sass'
})
export class CitaEliminarComponent implements OnInit{
  cita: Cita = {
    citaId: 0,
    usuarioId: 0,
    fechaCita: new Date(),
    descripcion: '',
    lugar: '',
    estado: '',
    fechaCreacion: new Date(),
    fechaModificacion: new Date()
  };

  constructor(
    private citaService: CitaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const citaObtenida = this.citaService.obtenerCitas().find(c => c.citaId === id);
    if (citaObtenida) {
      this.cita = citaObtenida;
    }
  }

  eliminarCita(): void {
    if (this.cita) {
      this.citaService.eliminarCita(this.cita.citaId);
      this.router.navigate(['/citas']); 
    }
  }
}
