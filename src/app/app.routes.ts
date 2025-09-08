import { Routes } from '@angular/router';
import { HomeComponent } from './features/events/home/home.component';
import { CreateEventComponent } from './features/events/eventCreation/eventCreation.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'app-create-event', component: CreateEventComponent },
  { path: '**', redirectTo: '' }
];