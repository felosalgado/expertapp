import { Component, inject, OnInit, signal } from '@angular/core';
import { Cita } from '../../interfaces/cita';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { CitaService } from '../../services/cita.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cita-delete',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './cita-delete.component.html',
  styleUrl: './cita-delete.component.sass'
})
export class CitaDeleteComponent implements OnInit {
  
  
  public currentCita = signal<Cita|undefined>(undefined);
  private route = inject(ActivatedRoute);
  private citaService = inject(CitaService);
  private router = inject(Router);
  
  ngOnInit(): void {
    this.route.paramMap.pipe(
      concatMap( params => {
        const id  = Number(params.get('id'));
        console.log(id);
        return this.citaService.getCitasById(id);   
      })
    )    
    .subscribe( cita => {
       this.currentCita.set(cita); 
       //console.log(this.currentCita()); 
    });
  }

  deleteCita(del: boolean){
    if (!del) { this.router.navigate(['/citas']); return;}
    
    const id: number = this.currentCita()!.citaId;
    this.citaService.deleteCita(id).subscribe( resp => this.router.navigate(['/citas']) );
  }
}
