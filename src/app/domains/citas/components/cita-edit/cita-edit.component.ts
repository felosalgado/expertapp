import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cita } from '../../interfaces/cita';
import { CitaService } from '../../services/cita.service';
import { concatMap } from 'rxjs';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-cita-edit',
  standalone: true,
  imports: [JsonPipe, DatePipe, CommonModule, ReactiveFormsModule],
  templateUrl: './cita-edit.component.html',
  styleUrl: './cita-edit.component.sass'
})
export class CitaEditComponent implements OnInit {
  
  private route = inject(ActivatedRoute);  
  private citaService = inject(CitaService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  private datepipe = new DatePipe('en-US',undefined,undefined);

  public currentCita = signal<Cita|undefined>(undefined);
  public citaForm : FormGroup;

  constructor() {  
    console.log(this.citaService.citas());
    this.citaForm = this.fb.group({
      citaId: [''],  
      usuarioId: [''],
      fechaCita: [''],
      descripcion: [''],
      lugar: [''],
      estado: ['']       
    })

    effect(() => {
      const cita = this.currentCita();
      if(cita != undefined){
        const fechaStr = this.datepipe.transform(cita!.fechaCita,'yyyy-MM-dd');      
        this.citaForm.patchValue({...cita, fechaCita: fechaStr});
      }
    });
  }

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
       console.log(this.currentCita()); 
    });  
  }

  onSubmit():void{    
    this.currentCita.set(this.citaForm.value);
    this.citaService.updateCita(this.currentCita()!).subscribe();
    this.router.navigate(['/citas']);  
    
  }


}
