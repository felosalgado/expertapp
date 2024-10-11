import { Component } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { UsuarioService } from 'domains/users/services/usuario.service';
import { Cita } from '../../interfaces/cita';
import { Usuario } from 'domains/users/interfaces/usuario'; 
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cita-crear',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cita-crear.component.html',
  styleUrl: './cita-crear.component.sass'
})
export class CitaCrearComponent {
  cita: Cita = {
    citaId: 0,
    usuarioId: 0,
    fechaCita: new Date(),
    descripcion: '',
    lugar: '',
    estado: 'Pendiente',
    fechaCreacion: new Date(), 
    fechaModificacion: new Date()
  };

  fechaCitaFormato: string = '';
  usuarios: Usuario[] = [];

  constructor(
    private citaService: CitaService,
    private usuarioService: UsuarioService, 
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.usuarios = this.usuarioService.getUsuarios(); 
  }

  crearCita(): void {
    if (this.cita) {
      const [year, month, day] = this.fechaCitaFormato.split('-').map(Number);
      this.cita.fechaCita = new Date(year, month - 1, day); 
      this.citaService.crearCita(this.cita);
      this.router.navigate(['/citas']); 
    }
  }
}
