import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../../interfaces/appointment';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.sass']
})
export class UpdateComponent implements OnInit {
  public myForm: FormGroup;
  private appointmentService = inject(AppointmentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  appointment: Appointment | null = null;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      UserId: ['', [Validators.required, Validators.minLength(1)]],
      Description: ['', [Validators.required, Validators.minLength(2)]],
      AppointmentDate: ['', [Validators.required]],
      Site: ['', [Validators.required, Validators.minLength(2)]],
      State: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.appointment = this.appointmentService.GetById(+id);
      this.myForm.patchValue(this.appointment!);
    }
  }

  UpdateAppointment(): void {
    if (this.myForm.valid) {
      const updatedAppointment: Appointment = {
        ...this.appointment,
        ...this.myForm.value
      };

      this.appointmentService.Update(updatedAppointment);
      this.router.navigate(['/appointment/list']); // Redirige a la lista de citas después de la actualización
    }
  }
}
