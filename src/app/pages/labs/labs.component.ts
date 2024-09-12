import { Component, signal } from '@angular/core';
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
  tasks = signal([
    'Instalar el Angular CLI',
    'Crear proyecto',
    'Crear componente'
  ]);
  name = signal('Felipe')
  age = 18;
  disabled = true;
  img = "https://w3schools.com/howto/img_avatar.png";

  person = signal({
    name: 'Felipe',
    age: 18,
    avatar: "https://w3schools.com/howto/img_avatar.png"
  })

  clickHandler(){
    alert('Hola Expert Medica')
  }

  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keyDownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement
    console.log(input.value);
  }
}
