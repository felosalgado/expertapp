import { Component, inject, OnInit } from '@angular/core';
import { Appointment } from '../../interfaces/appointment';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass']
})
export class AddComponent {


  private appointmentService = inject(AppointmentService);
  public fb: FormBuilder = inject(FormBuilder);
  public myForm: FormGroup = this.fb.group({
    UserId: ['', [Validators.required, Validators.minLength(1)]],
    Description: ['', [Validators.required, Validators.minLength(2)]],
    AppointmentDate: ['', [Validators.required, Validators.pattern('\\d{4}-\\d{2}-\\d{2}')]], // Validación para formato de fecha YYYY-MM-DD
    Site: ['', [Validators.required, Validators.minLength(2)]],
    State: ['', [Validators.required, Validators.minLength(2)]]
  });
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public nuevoAppointment: Appointment = {
    Id: 0,
    UserId: 1,
    Description: '',
    AppointmentDate: new Date(),
    CreationDate: new Date(),
    Site: '',
    State: '',
  };


  addAppointment(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const nuevoAppointment = {
      ...this.myForm.value,  // Extrae los valores del formulario
      Id: this.appointmentService.Get().length + 1,
      CreationDate: new Date()
    };

    this.appointmentService.Add(nuevoAppointment);
    this.router.navigate(['/appointment/list']);


  }
}
