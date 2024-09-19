import { Component, signal } from '@angular/core';
import { CommonModule, getLocaleDateTimeFormat } from '@angular/common';
import { ReversePipe } from '../../domains/shared/reverse.pipe';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReversePipe],
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
  currentDate = new Date();

  person = signal({
    name: 'Felipes',
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

  changeAge(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value; 
    this.person.update(prevState => {
      return{
        ...prevState,
        age: parseInt(newValue)
      }
    })
  }

  changeName(event: Event){
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.person.update(prevState => {
      return {
        ...prevState,
        name:newValue
      }
    });
  }
}
