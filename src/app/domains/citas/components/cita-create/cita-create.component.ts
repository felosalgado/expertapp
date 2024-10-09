import { Component, inject } from '@angular/core';
import { Cita } from '../../interfaces/cita';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CitaService } from '../../services/cita.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cita-create',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cita-create.component.html',
  styleUrl: './cita-create.component.sass'
})
export class CitaCreateComponent {
  private router = inject(Router);
  private citaService = inject(CitaService);
  public newCita = { citaId:0, usuarioId:0, fechaCitaStr: '', descripcion:'', lugar:'', estado:''};

  onSubmit(form:any){
    console.log(form);
    if (form.valid){
      var createdCita: Cita = { 
        citaId:0, 
        usuarioId: this.newCita.usuarioId,
        fechaCita: new Date(this.newCita.fechaCitaStr),
        descripcion: this.newCita.descripcion,
        lugar: this.newCita.lugar,
        estado: this.newCita.estado
      }

      this.citaService.createCita(createdCita).subscribe( newCita => {
        console.log(newCita)
        this.router.navigate(['/citas']);
      });
      
    }
  }
}
