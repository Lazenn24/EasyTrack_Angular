import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(private auth0: AuthService,
              private router: Router,
              private location: Location) {
    auth0.handleAuthentication();
  }


  public content = this.location;
  public title = 'EasyTrack';
  public auth: AuthService = this.auth0;

  ngOnInit() {
  console.log(this.location.path());

  if (this.location.path() !== '/tracker') {
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
  }

  login() {
    this.auth.login();
  }

  salir() {
    this.auth.logout();
  }

  // isAuthenticated() {
  //   console.log("aqui no ha pasao na");
  //   this.auth.isAuthenticated();
  // }


}
