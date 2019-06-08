import { Component, OnInit, AfterViewInit } from '@angular/core';
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

  ngOnInit() {}

  login() {
    this.auth.login();
  }

  salir() {
    this.auth.logout();
  }

  // Para hacer el scroll a los elementos, no funciona con ID, y con <a> se pierde la sesion por la API.
  scrollToWhy(){
    $('#whyAnchor')[0].scrollIntoView();
  }

  scrollToHowTo(){
    $('#howToAnchor')[0].scrollIntoView();
  }

  scrollToTop() {
    $('#home')[0].scrollIntoView();
  }

  // isAuthenticated() {
  //   console.log("aqui no ha pasao na");
  //   this.auth.isAuthenticated();
  // }


}
