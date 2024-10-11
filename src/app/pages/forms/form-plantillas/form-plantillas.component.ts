import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-plantillas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-plantillas.component.html',
  styleUrl: './form-plantillas.component.sass'
})
export class FormPlantillasComponent {
  user = { name: '', email: '', password: ''};

  onSubmit(formm: any) {
    if (formm.valid){
      console.log('Formulario enviado:', this.user);
      // Logica paara guardar datos, llamar apis para valida etc
    }
  }

}
