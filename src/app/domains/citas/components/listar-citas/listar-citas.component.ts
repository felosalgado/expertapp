import { Component, OnInit } from '@angular/core';
import { Cita } from '../../interfaces/cita.interface';
import { CitasService } from '../../services/citas.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-citas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listar-citas.component.html',
  styleUrl: './listar-citas.component.sass'
})
export class ListarCitasComponent implements OnInit {

    citas: Cita[] = [];
  
    constructor(
      private citasService: CitasService,
      private router: Router
    ) {}  
    
    ngOnInit(): void {
      this.citasService.listarCitas().subscribe((citas: Cita[]) => {
        this.citas = citas;
      });
    }
  
}
