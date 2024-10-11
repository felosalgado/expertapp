import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cita } from '../../../models/Cita.model';
import { UserService } from '../../services/user.service'; // Servicio para obtener usuarios
import { User } from '../../../models/user.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-cita-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-cita-dialog.component.html',
  styleUrls: ['./edit-cita-dialog.component.sass'],
  providers: [
    provideNativeDateAdapter()
  ]
})
export class EditCitaDialogComponent {
  editCitaForm: FormGroup;
  users: User[] = []; // Para cargar los usuarios disponibles

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<EditCitaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Cita: Cita }
  ) {
    // Inicializar el formulario con los datos de la cita a editar
    this.editCitaForm = this.fb.group({
      usuarioID: [data.Cita.usuarioID, Validators.required],
      fechaCita: [new Date(data.Cita.fechaCita), Validators.required],
      horaCita: [this.getFormattedTime(data.Cita.fechaCita), Validators.required],
      descripcion: [data.Cita.descripcion, Validators.required],
      lugar: [data.Cita.lugar, Validators.required],
      estado: [data.Cita.estado, Validators.required],
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
    if (this.editCitaForm.valid) {
      const user = this.users.find(user => user.idUser === this.editCitaForm.value.usuarioID);
      if (user) {
        const updatedCita: Cita = {
          citaID: this.data.Cita.citaID, // Mantén el ID de la cita existente
          usuarioID: this.editCitaForm.value.usuarioID,
          fechaCita: this.combineFechaHora(this.editCitaForm.value.fechaCita, this.editCitaForm.value.horaCita),
          descripcion: this.editCitaForm.value.descripcion,
          lugar: this.editCitaForm.value.lugar,
          estado: this.editCitaForm.value.estado,
          fechaCreacion: this.data.Cita.fechaCreacion, // Mantén la fecha de creación existente
          fechaModificacion: new Date(), // Fecha de modificación actual
          user: user // Asigna el usuario si fue encontrado
        };
        this.dialogRef.close(updatedCita); // Devuelve la cita actualizada
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
    return this.users.find(user => user.idUser === this.editCitaForm.value.usuarioID);
  }

  // Obtener los controles del formulario para validación
  get CitaDate() {
    return this.editCitaForm.get('fechaCita');
  }

  get CitaTime() {
    return this.editCitaForm.get('horaCita');
  }
}
