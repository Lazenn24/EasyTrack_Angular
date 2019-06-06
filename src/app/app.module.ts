import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { TrackerService } from './services/tracker.service';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AboutComponent } from './components/about/howTo/how-to.component';
import { HowToComponent } from './components/about/why/why.component';
import { AuthGuardService } from './services/auth-guard.service';




import { AuthService } from './services/auth.service';
import { TrackerComponent } from './components/tracker/tracker.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    HowToComponent,
    TrackerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    TrackerService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
