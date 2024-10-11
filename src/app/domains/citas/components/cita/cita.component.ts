import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/cita.service';
import { UsuarioService } from 'domains/users/services/usuario.service';
import { Cita } from '../../interfaces/cita';
import { Usuario } from 'domains/users/interfaces/usuario'; 
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
  usuarios: Usuario[] = [];

  constructor(private citaService: CitaService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.citas = this.citaService.obtenerCitas(); 
    this.usuarios = this.usuarioService.getUsuarios(); 
  }

  obtenerNombreCompleto(usuarioId: number): string {
    const usuario = this.usuarios.find(u => u.idUsuario === usuarioId);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Usuario no encontrado';
  }
}
