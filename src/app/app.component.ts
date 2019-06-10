import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrackerService } from './services/tracker.service';
import { interval } from 'rxjs';
import { Location } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public title = 'EasyTracking';

  public content = this.location;


  // La logica es correcta en principio, pero Amazon bloquea tantas peticiones detras de un Captcha
  getEveryUrl(){
    this.trackerService.getEveryUrl().subscribe((data: any[]) => {
      for(var i = 0; i < data.length; i++){
        this.trackerService.checkPrice(data[i].url);
      }
    });
  }


  ngOnInit() {
    // Se revisan los precios cada 30 min
    const counter = interval(1800000);
    counter.subscribe(() =>{
      this.getEveryUrl();
      });

  }

  constructor(private router: Router,
              private trackerService: TrackerService,
              private location: Location) {
  }

}
