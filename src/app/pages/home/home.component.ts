import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'] 
})
export class HomeComponent {
  constructor(private router: Router) {}
 
  goToLifeCycle(){
    this.router.navigate(['/lifecycle']);
  }

}
