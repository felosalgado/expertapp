import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CitasService } from '../../services/citas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eliminar-citas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './eliminar-citas.component.html',
  styleUrls: ['./eliminar-citas.component.sass']
})
export class EliminarCitasComponent {
  citaId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private citasService: CitasService,
  ) {
    this.citaId = this.route.snapshot.params['id'];
  }

  onDelete(): void {
    this.citasService.eliminarCita(Number(this.citaId));
    alert('Cita eliminada exitosamente');
    this.router.navigate(['/citas']);
  }
}
