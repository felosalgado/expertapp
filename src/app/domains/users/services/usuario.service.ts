import { Injectable, signal } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios = signal<Usuario[]>([]);

  constructor() {
    this.simularApiUsuarios();
   }

   // Simulación de la llamada a una API para obtener usuarios
  private simularApiUsuarios(): void {
    const mockUsuarios: Usuario[] = [
      { idUsuario: 1, nombre: 'Juan', apellido: 'Pérez', telefono: '324345434', estado: 'activo', fechaCreacion: new Date() },
      { idUsuario: 2, nombre: 'María', apellido: 'López', telefono: '32430956', estado: 'activo', fechaCreacion: new Date() }
    ];
    this.usuarios.set(mockUsuarios);
  }

  // Obtener usuarios directamente del signal
  getUsuarios(): Usuario[] {
    return this.usuarios();
  }

  // Simulación de la inserción de un nuevo usuario
  agregarUsuario(nuevoUsuario: Usuario): void {
    const usuariosActualizados = [...this.usuarios(), nuevoUsuario];
    this.usuarios.set(usuariosActualizados);
  }

  // Actualizar un usuario
  actualizarUsuario(updatedUsuario: Usuario): void {
    const usuariosActualizados = this.usuarios().map(usuario =>
      usuario.idUsuario === updatedUsuario.idUsuario ? updatedUsuario : usuario
      
    );
    this.usuarios.set(usuariosActualizados);
  }

  eliminarUsuario(idUsuario: number): void {
    const usuariosActualizados = this.usuarios().filter(usuario => usuario.idUsuario !== idUsuario);
    this.usuarios.set(usuariosActualizados);  // Actualiza el signal con la lista filtrada
  }
}
