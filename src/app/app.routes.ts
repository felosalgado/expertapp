import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';
import { LifecycleComponent } from './pages/lifecycle/lifecycle.component'


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
        path: '**', 
        component: LabsComponent
    }
];
