import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListarCitasComponent } from '../../domains/citas/components/listar-citas/listar-citas.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListarCitasComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'] 
})
export class HomeComponent {
  constructor(private router: Router) {}
 
  goToLifeCycle(){
    this.router.navigate(['/lifecycle']);
  }

}
