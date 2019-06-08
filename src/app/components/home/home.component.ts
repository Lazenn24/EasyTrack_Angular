import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public home = document.getElementById('home');

  public width: number;

  public title = 'EasyTrack';

  @Output() homeLoaded: EventEmitter<string>;

  constructor() {
    this.homeLoaded = new EventEmitter(); }

  ngOnInit() {
    $(document).ready(function() {
        $(window).scroll(function() {
          if ($(document).scrollTop() > 30) {
            $('nav').addClass('navbar-scrolled');
            $('nav').addClass('navbar-light');
            $('nav').removeClass('navbar-dark');
            $('.nav-link').css('color', 'black');
          } else {
            $('nav').removeClass('navbar-scrolled');
            $('nav').removeClass('navbar-light');
            $('nav').addClass('navbar-dark');
            $('.nav-link').css('color', 'white');
          }
        });

      });
  }

  scrollToWhy() {
    $('#whyAnchor')[0].scrollIntoView();
  }

  scrollToHowTo() {
    $('#howToAnchor')[0].scrollIntoView();
  }

}
