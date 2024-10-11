import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-example',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-example.component.html',
  styleUrl: './form-example.component.sass'
})
export class FormExampleComponent {
  user = { name:'', email: '', password: '' }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Formulario enviado:', this.user);
      // Aquí podrías agregar lógica adicional como guardar los datos o enviar a una API
    }
  }
}


