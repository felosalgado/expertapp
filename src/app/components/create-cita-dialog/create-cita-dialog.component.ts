import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service'; // Asegúrate de que la ruta sea correcta
import { User } from '../../../models/user.model';
import { Cita } from '../../../models/Cita.model'; // Asegúrate de importar tu modelo Cita
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'; // Importa MatSelectModule
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-cita-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule
  ],
  templateUrl: './create-cita-dialog.component.html',
  styleUrls: ['./create-cita-dialog.component.sass'],
  providers: [
    provideNativeDateAdapter()
  ]
})
export class CreateCitaDialogComponent implements OnInit {
  CitaForm: FormGroup;
  users: User[] = [];
  Cita: Cita | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateCitaDialogComponent>,
    private userService: UserService // Inyecta el UserService
  ) {
    this.CitaForm = this.fb.group({
      usuarioID: ['', Validators.required], // Aquí se asume que el ID del usuario se seleccionará desde un dropdown
      fechaCita: ['', Validators.required],
      horaCita: ['', Validators.required], // Nuevo control para la hora
      descripcion: ['', Validators.required],
      lugar: ['', Validators.required],
      estado: ['Pendiente'], // Estado por defecto, puedes cambiarlo según sea necesario
      fechaCreacion: [new Date()], // Fecha de creación por defecto
      fechaModificacion: [null] // Inicialmente, sin fecha de modificación
    });
  }

  ngOnInit(): void {
    this.loadUsers(); // Llama al método para cargar usuarios al inicializar el componente
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
        next: (users) => {
            // Ordenar los usuarios por userName antes de asignarlos
            this.users = users.sort((a, b) => {
                // Comparar los nombres de usuario (userName) de forma case-insensitive
                return a.userName.toLowerCase().localeCompare(b.userName.toLowerCase());
            });
        },
        error: (err) => {
            console.error('Error al cargar usuarios', err); // Manejo de errores
        }
    });
}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.CitaForm.valid) {
      const user = this.users.find(user => user.idUser === this.CitaForm.value.usuarioID);
      if (user) {
        const newCita: Cita = {
          citaID: 0,
          usuarioID: this.CitaForm.value.usuarioID,
          fechaCita: this.combineFechaHora(this.CitaDate?.value, this.CitaTime?.value),
          descripcion: this.CitaForm.value.descripcion,
          lugar: this.CitaForm.value.lugar,
          estado: this.CitaForm.value.estado,
          fechaCreacion: this.CitaForm.value.fechaCreacion,
          user: user
        };
        this.dialogRef.close(newCita);
      } else {
        console.error('Usuario no encontrado');
        // Aquí podrías manejar el error, como mostrar un mensaje al usuario
      }
    }
  }

  get selectedUser() {
    return this.CitaForm.get('usuarioID');
  }

  get CitaDate() {
    return this.CitaForm.get('fechaCita');
  }

  get description() {
    return this.CitaForm.get('descripcion');
  }

  get location() {
    return this.CitaForm.get('lugar');
  }
  get CitaTime() {
    return this.CitaForm.get('horaCita');
  }

  private combineFechaHora(fecha: Date, hora: string): Date {
    const fechaHoraCita = new Date(fecha);
    const [horas, minutos] = hora.split(':');
    fechaHoraCita.setHours(parseInt(horas, 10), parseInt(minutos, 10));
    return fechaHoraCita;
  }

}
