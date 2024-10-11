import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../services/citas.service';
import { UsuarioService } from '../../../users/services/usuario.service';
import { Usuario } from '../../../users/interfaces/usuario';
import { Cita } from '../../interfaces/cita';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CitaListComponent } from '../cita-list/cita-list.component';

@Component({
  selector: 'app-cita',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CitaListComponent],
  templateUrl: './cita.component.html',
  styleUrl: './cita.component.sass',
})

export class CitaComponent implements OnInit {
  citas: Cita[] = [];
  usuarios: Usuario[] = [];

  nuevaCita: Cita = {
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
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.citas = this.citaService.getCitas(); // Obtenemos los citas directamente
    this.usuarios = this.usuarioService.getUsuarios(); // Obtenemos los usuarios directamente
  }

  agregarCita(): void {

    
    const nuevoCita = {
      ...this.nuevaCita,
      idCita: this.citas.length + 1,
      fechaCreacion: new Date(),
    };
    this.citaService.agregarCita(nuevoCita);
    this.citas = this.citaService.getCitas(); // Actualizamos la lista de citas
    // Limpiar el formulario
    this.nuevaCita = {
      idCita: 0,
      idUsuario: 0,
      fechaCita: new Date(),
      descipcion: '',
      lugar: '',
      estado: '',
      fechaCreacion: new Date(),
      fechaModificacion: new Date(),
    };
  }
}
