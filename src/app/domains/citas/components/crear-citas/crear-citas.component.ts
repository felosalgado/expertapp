import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CitasService } from '../../services/citas.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Cita } from '../../interfaces/cita.interface';

@Component({
  selector: 'app-crear-citas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-citas.component.html',
  styleUrl: './crear-citas.component.sass'
})
export class CrearCitasComponent {

  citaForm: FormGroup;
  
  constructor(private fb: FormBuilder, private citasService: CitasService, private router: Router) {
    this.citaForm = this.fb.group({
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });


  }

  onSubmit(): void {
    if (this.citaForm.valid) {

      const { titulo, fecha, hora } = this.citaForm.value;

      const [hours, minutes] = hora.split(':').map(Number); 
      const citaHora = new Date(fecha); 
      citaHora.setHours(hours, minutes); //

      const nuevaCita: Cita = { 
        id: 0, 
        titulo, 
        fecha: new Date(fecha), 
        hora: citaHora 
      };

      this.citasService.crearCita(nuevaCita);
      alert('Cita creada exitosamente');
      this.citaForm.reset();

      this.router.navigate(['/citas'])
    }
  }
}
