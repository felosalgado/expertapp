import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../interfaces/cita';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cita-editar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cita-editar.component.html',
  styleUrl: './cita-editar.component.sass'
})
export class CitaEditarComponent implements OnInit {
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

  fechaCitaString: string = '';

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
      this.fechaCitaString = this.formatearFecha(citaObtenida.fechaCita);
    }
  }

  formatearFecha(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  }

  actualizarCita(): void {
    if (this.cita) {
      const [year, month, day] = this.fechaCitaString.split('-').map(Number);
      this.cita.fechaCita = new Date(year, month - 1, day); 
      this.citaService.actualizarCita(this.cita);
      this.router.navigate(['/citas']); 
    }
  }
  
}
