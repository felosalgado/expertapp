import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.sass'
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = {
    idUsuario: 0,
    nombre: '',
    apellido: '',
    telefono: '',
    estado: '',
    fechaCreacion: new Date()
  };

    constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarios = this.usuarioService.getUsuarios();  // Obtenemos los usuarios directamente
  }

  agregarUsuario(): void {
    const nuevoUsuario = { ...this.nuevoUsuario, idUsuario: this.usuarios.length + 1, fechaCreacion: new Date() };
    this.usuarioService.agregarUsuario(nuevoUsuario);
    this.usuarios = this.usuarioService.getUsuarios();  // Actualizamos la lista de usuarios
    // Limpiar el formulario
    this.nuevoUsuario = { idUsuario: 0, nombre: '', apellido: '', telefono: '', estado: '', fechaCreacion: new Date() };
  }
}
