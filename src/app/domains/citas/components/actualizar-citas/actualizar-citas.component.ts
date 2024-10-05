import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CitasService } from '../../services/citas.service';
import { Cita } from '../../interfaces/cita.interface';

@Component({
  selector: 'app-actualizar-citas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './actualizar-citas.component.html',
  styleUrl: './actualizar-citas.component.sass'
})
export class ActualizarCitasComponent implements OnInit {
  editarCitaForm!: FormGroup;
  citaId!: number;

  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.editarCitaForm = this.fb.group({
      titulo: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
    });

    this.citaId = +this.route.snapshot.paramMap.get('id')!;

    this.cargarCita();
  }

  cargarCita(): void {
    this.citasService.obtenerCitaPorId(this.citaId).subscribe(cita => {
      this.editarCitaForm.patchValue({
        titulo: cita.titulo,
        fecha: this.formatearFecha(cita.fecha),
        hora: this.formatearHora(cita.hora)
      });
    });
  }

  formatearFecha(fecha: Date): string {
    const opciones: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-CA', opciones).format(fecha);
  }

  formatearHora(hora: Date): string {
    const horas = hora.getHours().toString().padStart(2, '0');
    const minutos = hora.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  }

  onSubmit(): void {
    if (this.editarCitaForm.valid) {

      const { titulo, fecha, hora } = this.editarCitaForm.value;

      const [hours, minutes] = hora.split(':').map(Number);
      
      const citaFecha = new Date(fecha);

      citaFecha.setHours(hours, minutes, 0, 0); 

      const citaActualizada: Cita = {
        id: this.citaId,
        titulo: titulo,
        fecha: citaFecha, 
        hora: citaFecha 
      };

      this.citasService.actualizarCita(citaActualizada);
      this.router.navigate(['/citas']);

    }
  }
}
