import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.sass'
})
export class LabsComponent {
  welcome = 'Hola';
  tasks = [
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componente'
  ];
  name = 'Felipe'
  age = 21;
  disabled = true;
  img = "https://w3schools.com/howto/img_avatar.png";

  person = {
    name: 'Felipe',
    age: 21,
    avatar: "https://w3schools.com/howto/img_avatar.png"
  }

  clickHandler(){
    alert('Hola Expert Medica')
  }

  changeHandler(event: Event){
    console.log(event);
  }

  keyDownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement
    console.log(input.value);
  }
}
