import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';
import { LifecycleComponent } from './pages/lifecycle/lifecycle.component';
import { UsuarioComponent } from './domains/users/components/usuario/usuario.component';
import { UsuarioEditComponent } from './domains/users/components/usuario-edit/usuario-edit.component';


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
        path: 'usuarios',
        component: UsuarioComponent
    },
    {
        path: 'usuario/edit/:id',
        component: UsuarioEditComponent
    },
    {
        path: '**', 
        component: LabsComponent
    }
];


