import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from '../../../models/appointment.model';
import { UserService } from '../../services/user.service'; // Servicio para obtener usuarios
import { User } from '../../../models/user.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-appointment-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-appointment-dialog.component.html',
  styleUrls: ['./edit-appointment-dialog.component.sass'],
  providers: [
    provideNativeDateAdapter()
  ]
})
export class EditAppointmentDialogComponent {
  editAppointmentForm: FormGroup;
  users: User[] = []; // Para cargar los usuarios disponibles

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<EditAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { appointment: Appointment }
  ) {
    // Inicializar el formulario con los datos de la cita a editar
    this.editAppointmentForm = this.fb.group({
      usuarioID: [data.appointment.usuarioID, Validators.required],
      fechaCita: [new Date(data.appointment.fechaCita), Validators.required],
      horaCita: [this.getFormattedTime(data.appointment.fechaCita), Validators.required],
      descripcion: [data.appointment.descripcion, Validators.required],
      lugar: [data.appointment.lugar, Validators.required],
      estado: [data.appointment.estado, Validators.required],
      fechaModificacion: [new Date(), Validators.required] // Fecha actual para modificaciones
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  // Método para cargar los usuarios
  private loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        // Ordenar los usuarios por userName antes de asignarlos
        this.users = users.sort((a, b) => {
          // Comparar los nombres de usuario (userName) de forma case-insensitive
          return a.userName.toLowerCase().localeCompare(b.userName.toLowerCase());
        });
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
      }
    });
  }


  // Enviar el formulario
  public onSubmit(): void {
    if (this.editAppointmentForm.valid) {
      const user = this.users.find(user => user.idUser === this.editAppointmentForm.value.usuarioID);
      if (user) {
        const updatedAppointment: Appointment = {
          citaID: this.data.appointment.citaID, // Mantén el ID de la cita existente
          usuarioID: this.editAppointmentForm.value.usuarioID,
          fechaCita: this.combineFechaHora(this.editAppointmentForm.value.fechaCita, this.editAppointmentForm.value.horaCita),
          descripcion: this.editAppointmentForm.value.descripcion,
          lugar: this.editAppointmentForm.value.lugar,
          estado: this.editAppointmentForm.value.estado,
          fechaCreacion: this.data.appointment.fechaCreacion, // Mantén la fecha de creación existente
          fechaModificacion: new Date(), // Fecha de modificación actual
          user: user // Asigna el usuario si fue encontrado
        };
        this.dialogRef.close(updatedAppointment); // Devuelve la cita actualizada
      } else {
        console.error('Usuario no encontrado');
        // Manejar el error (ej. mostrar mensaje al usuario)
      }
    }
  }

  public onCancel(): void {
    this.dialogRef.close(false);
  }

  // Formatear la hora de la cita para que aparezca correctamente en el formulario
  private getFormattedTime(fechaCita: Date): string {
    const date = new Date(fechaCita);
    const horas = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  }

  // Combinar la fecha y la hora para obtener la fecha completa de la cita
  private combineFechaHora(fecha: Date, hora: string): Date {
    const fechaHoraCita = new Date(fecha);
    const [horas, minutos] = hora.split(':');
    fechaHoraCita.setHours(parseInt(horas, 10), parseInt(minutos, 10));
    return fechaHoraCita;
  }

  // Obtener el usuario seleccionado
  private getSelectedUser(): User | undefined {
    return this.users.find(user => user.idUser === this.editAppointmentForm.value.usuarioID);
  }

  // Obtener los controles del formulario para validación
  get appointmentDate() {
    return this.editAppointmentForm.get('fechaCita');
  }

  get appointmentTime() {
    return this.editAppointmentForm.get('horaCita');
  }
}
