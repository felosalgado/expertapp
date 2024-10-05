import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-actualizar-citas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet],
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
  ) {}

  ngOnInit(): void {
    this.editarCitaForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.citaId = +this.route.snapshot.paramMap.get('id')!;
    
    this.cargarCita();
  }

  cargarCita(): void {
    this.citasService.obtenerCitaPorId(this.citaId).subscribe(cita => {
      this.editarCitaForm.patchValue({
        titulo: cita.titulo,
        fecha: cita.fecha,
        hora: cita.hora,
      });
    });
  }

  onSubmit(): void {
    if (this.editarCitaForm.valid) {
      const citaActualizada = {
        id: this.citaId,
        ...this.editarCitaForm.value
      };

      this.citasService.actualizarCita(citaActualizada).subscribe(() => {
        this.router.navigate(['/citas']);
      });
    }
  }
}
