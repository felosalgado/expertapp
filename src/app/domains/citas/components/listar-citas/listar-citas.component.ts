import { Component, OnInit } from '@angular/core';
import { Cita } from '../../interfaces/cita.interface';
import { CitasService } from '../../services/citas.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-citas',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './listar-citas.component.html',
  styleUrl: './listar-citas.component.sass'
})
export class ListarCitasComponent implements OnInit {

    citas: Cita[] = [];
  
    constructor(private citasService: CitasService) {}
  
    ngOnInit(): void {
      this.citasService.listarCitas().subscribe((citas: Cita[]) => {
        this.citas = citas;
      });
    }
  
    // Método para editar una cita, puede redirigir a un formulario de edición
    editarCita(id: number): void {
      console.log(`Editar cita con ID: ${id}`);
    }
  
    eliminarCita(id: number): void {
      const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta cita?');
      if (confirmacion) {
        this.citasService.eliminarCita(id);
        this.citas = this.citas.filter(cita => cita.id !== id);
        alert('Cita eliminada exitosamente');
      }
    }

}
