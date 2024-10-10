import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../interfaces/appointment';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass'],
  imports: [CommonModule]
})
export class DeleteComponent implements OnInit {
  public appointmentList: Appointment[] = [];
  appointment: Appointment | null = null;
  private appointmentService = inject(AppointmentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadAppointments();
    // Obtener el ID de la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Buscar el appointment por ID
      this.appointment = this.appointmentService.GetById(Number(id));
    }
  }
  loadAppointments(): void {
    this.appointmentList = this.appointmentService.Get();
  }
  DeleteAppointment(): void {
    if (this.appointment) {
      // Eliminar el appointment
      this.appointmentService.Delete(this.appointment.Id);
      // Navegar a la lista de appointments
      this.router.navigate(['/appointment/list']);
    }
  }
}
