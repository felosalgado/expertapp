import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataexService } from '../../services/dataex.service';

@Component({
  selector: 'app-dataex',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dataex.component.html',
  styleUrl: './dataex.component.sass'
})
export class DataexComponent {
    dataService = inject(DataexService)

       fetchData() {
       this.dataService.fetchData(); // Llamar al método del servicio para obtener datos
    }
}
