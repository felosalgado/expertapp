import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitasService } from '../../services/citas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crear-citas.component.html',
  styleUrl: './crear-citas.component.sass'
})
export class CrearCitasComponent {

  citaForm: FormGroup;

  constructor(private fb: FormBuilder, private citasService: CitasService) {
    this.citaForm = this.fb.group({
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.citaForm.valid) {
      this.citasService.crearCita(this.citaForm.value);
      alert('Cita creada exitosamente');
      this.citaForm.reset();
    }
  }
}
