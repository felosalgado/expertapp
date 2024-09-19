import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-usuario-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-edit.component.html',
  styleUrl: './usuario-edit.component.sass'
})
export class UsuarioEditComponent implements OnInit {
  usuario: Usuario = {
    idUsuario: 0,
    nombre: '',
    apellido: '',
    estado: '', 
    telefono: '',
    fechaCreacion: new Date()
  };

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const usuarioEncontrado = this.usuarioService.getUsuarios().find(u => u.idUsuario === id);
    if (usuarioEncontrado) {
      this.usuario = usuarioEncontrado;
    }
  }

  actualizarUsuario(): void {
    if (this.usuario) {
      this.usuarioService.actualizarUsuario(this.usuario);
      this.router.navigate(['/usuarios']);  // Redirige a la lista de usuarios o a donde prefieras
    }
  }
}
