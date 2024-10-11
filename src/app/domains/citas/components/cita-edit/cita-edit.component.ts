import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../users/services/usuario.service';
import { Usuario } from '../../../users/interfaces/usuario';
import { CitaService } from '../../services/citas.service';
import { Cita } from '../../interfaces/cita';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cita-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cita-edit.component.html',
  styleUrl: './cita-edit.component.sass',
})
export class CitaEditComponent implements OnInit {

  usuarios: Usuario[] = [];
  
  cita: Cita = {
    idCita: 0,
    idUsuario: 0,
    fechaCita: new Date(),
    descipcion: '',
    lugar: '',
    estado: '',
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
  };

  constructor(
    private citaService: CitaService,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.usuarios = this.usuarioService.getUsuarios(); // Obtenemos los usuarios directamente
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const citaEncontrado = this.citaService
      .getCitas()
      .find((u) => u.idCita === id);
    if (citaEncontrado) {
      this.cita = citaEncontrado;
    }
  }

  actualizarCita(): void {
    if (this.cita) {
      this.citaService.actualizarCita(this.cita);
      this.router.navigate(['/citas']); // Redirige a la lista de citas o a donde prefieras
    }
  }
}
