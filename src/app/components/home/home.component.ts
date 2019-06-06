import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public home = document.getElementById('home');

  public width: number;

  public title = 'EasyTrack';

  constructor() { }

  ngOnInit() {
    this.width = window.screen.width;
  }

}
