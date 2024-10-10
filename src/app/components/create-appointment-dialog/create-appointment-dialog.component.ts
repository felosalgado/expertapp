import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service'; // Asegúrate de que la ruta sea correcta
import { User } from '../../../models/user.model';
import { Appointment } from '../../../models/appointment.model'; // Asegúrate de importar tu modelo Appointment
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'; // Importa MatSelectModule
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-appointment-dialog',
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
  templateUrl: './create-appointment-dialog.component.html',
  styleUrls: ['./create-appointment-dialog.component.sass'],
  providers: [
    provideNativeDateAdapter()
  ]
})
export class CreateAppointmentDialogComponent implements OnInit {
  appointmentForm: FormGroup;
  users: User[] = [];
  appointment: Appointment | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateAppointmentDialogComponent>,
    private userService: UserService // Inyecta el UserService
  ) {
    this.appointmentForm = this.fb.group({
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
        this.users = users; // Asigna los usuarios obtenidos al arreglo
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
    if (this.appointmentForm.valid) {
      const user = this.users.find(user => user.idUser === this.appointmentForm.value.usuarioID);
      if (user) {
        const newAppointment: Appointment = {
          citaID: 0,
          usuarioID: this.appointmentForm.value.usuarioID,
          fechaCita: this.combineFechaHora(this.appointmentDate?.value, this.appointmentTime?.value),
          descripcion: this.appointmentForm.value.descripcion,
          lugar: this.appointmentForm.value.lugar,
          estado: this.appointmentForm.value.estado,
          fechaCreacion: this.appointmentForm.value.fechaCreacion,
          user: user
        };
        this.dialogRef.close(newAppointment);
      } else {
        console.error('Usuario no encontrado');
        // Aquí podrías manejar el error, como mostrar un mensaje al usuario
      }
    }
  }

  get selectedUser() {
    return this.appointmentForm.get('usuarioID');
  }

  get appointmentDate() {
    return this.appointmentForm.get('fechaCita');
  }

  get description() {
    return this.appointmentForm.get('descripcion');
  }

  get location() {
    return this.appointmentForm.get('lugar');
  }
  get appointmentTime() {
    return this.appointmentForm.get('horaCita');
  }

  private combineFechaHora(fecha: Date, hora: string): Date {
    const fechaHoraCita = new Date(fecha);
    const [horas, minutos] = hora.split(':');
    fechaHoraCita.setHours(parseInt(horas, 10), parseInt(minutos, 10));
    return fechaHoraCita;
  }

}