import { Routes } from '@angular/router';

import { SchedulingvisitComponent } from './schedulingvisits/schedulingvisit/schedulingvisit.component';
import { SchedulingvisitsComponent } from './schedulingvisits/schedulingvisits.component';
import { SchedulingMeetingComponent } from './scheduling/scheduling-meeting/scheduling-meeting.component';
import { SchedulingHomeComponent } from './scheduling/scheduling-home/scheduling-home.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './sign-up/signup.component';
import { UserComponent } from './user/user.component';
import { SigninComponent } from './sign-in/signin.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cadastrar', component: SignupComponent },
  { path: 'user', component: UserComponent },
  { path: 'agendamento/reuniao', component: SchedulingMeetingComponent },
  { path: 'agendamento', component: SchedulingHomeComponent },
  { path: 'entrar', component: SigninComponent },
  { path: 'agendamento/visita', component: SchedulingvisitsComponent}
];

// PARA CRIAR SUA ROTA BASTA FAZER O Q FOI FEITO ACIMA
// path: e nome da sua rota exemplo localhost:4200/agendamento
// component: 'e o q vai aparecer la
// <router-outlet></router-outlet> <--- isso aqui faz o resto pra vc no HTML principal
