import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TrackerComponent } from './components/tracker/tracker.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'tracker', component: TrackerComponent, canActivate: [AuthGuardService]},
  {path: '**', component: HomeComponent, pathMatch: 'full' }
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
