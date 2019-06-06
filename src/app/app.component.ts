import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public title = 'EasyTracking';

  public content = this.router;

  ngOnInit() {}

  constructor(private router: Router) {
  }

}
