import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';
import { LifecycleComponent } from './pages/lifecycle/lifecycle.component';
import { UsuarioComponent } from './domains/users/components/usuario/usuario.component';
import { UsuarioEditComponent } from './domains/users/components/usuario-edit/usuario-edit.component';
import { FormExampleComponent } from './pages/labs/forms/form-example/form-example.component';
import { FormReactivoComponent } from './pages/labs/forms/form-reactivo/form-reactivo.component';
import { FormArrayComponent } from './pages/labs/forms/form-array/form-array.component';
import { FormPlantillasComponent } from './pages/forms/form-plantillas/form-plantillas.component';
import { DataexComponent } from './domains/users/components/dataex/dataex.component';
import { FormReactivoStComponent } from './pages/labs/forms/form-reactivo-st/form-reactivo-st.component';
import { CitaComponent } from './domains/citas/components/cita/cita.component';
import { CitaEditarComponent } from './domains/citas/components/cita-editar/cita-editar.component';
import { CitaEliminarComponent } from './domains/citas/components/cita-eliminar/cita-eliminar.component';
import { CitaCrearComponent } from './domains/citas/components/cita-crear/cita-crear.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'labs',
        component: LabsComponent
    },
    {
        path: 'lifecycle',
        component: LifecycleComponent
    },
    {
        path: 'forms',
        component: FormExampleComponent
    },
    {
        path: 'formsreactivo',
        component: FormReactivoComponent
    },
    {
        path: 'formsarray',
        component: FormArrayComponent
    },
    {
        path: 'form-plantillas',
        component: FormPlantillasComponent
    },
    {
        path: 'form-reactivo',
        component: FormReactivoComponent
    },
    {
        path: 'form-array',
        component: FormArrayComponent
    },
    {
        path: 'dataex',
        component: DataexComponent
    },
    {
        path: 'form-reactivo-st',
        component: FormReactivoStComponent
    },
    {
        path: 'usuarios',
        component: UsuarioComponent
    },
    {
        path: 'usuario/edit/:id',
        component: UsuarioEditComponent
    },   
    {
        path: 'citas',
        component: CitaComponent
    },
    {
        path: 'cita/crear',
        component: CitaCrearComponent
    }, 
    {
        path: 'cita/editar/:id',
        component: CitaEditarComponent
    },   
    {
        path: 'cita/eliminar/:id',
        component: CitaEliminarComponent
    }, 
    {
        path: '**', 
        component: LabsComponent
    }
];


