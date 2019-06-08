import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-why',
  templateUrl: './why.component.html',
  styleUrls: ['./why.component.sass']
})
export class HowToComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scrollToHowTo() {
    $('#howToAnchor')[0].scrollIntoView();
  }

}
