import { Component, Input  } from '@angular/core';
import { CitaService } from '../../services/citas.service';
import { Cita } from '../../interfaces/cita';
import { UsuarioService } from '../../../users/services/usuario.service';
import { Usuario } from '../../../users/interfaces/usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-cita-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cita-list.component.html',
  styleUrl: './cita-list.component.sass'
})
export class CitaListComponent {
  @Input() citas!: Cita[];
  usuarios: Usuario[] = [];

  constructor(private router: Router, private citaService: CitaService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarios = this.usuarioService.getUsuarios(); // Obtenemos los usuarios directamente
  }

  editarCita(idCita: number) {
    this.router.navigate(['/cita/edit', idCita]);
  }

  getUsuarioNombre(idUsuario: number): string {
    const usuario = this.usuarios.find(user => user.idUsuario === idUsuario);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Desconocido'; 
  }

  eliminarCita(idCita: number): void {
    this.citaService.eliminarCita(idCita);
    this.router.navigate(['/citas']);
    this.citas = this.citaService.getCitas();
  }
}
