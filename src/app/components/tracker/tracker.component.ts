import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { TrackerService } from '../../services/tracker.service';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.sass']
})
export class TrackerComponent implements OnInit, AfterViewInit {

  chart;

  profile: any;
  items: any[];
  time: any;
  help = 'Introduce el nombre que quieres que tenga el producto';
  errorName = false;
  errorUrl = false;
  private regEx = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  urlText = 'Introduce la URL completa del producto';

  html: any;
  constructor(private trackerService: TrackerService,
              private auth: AuthService) {}

  getPriceTag(url: string, nombre: string) {
    if (nombre.length > 10 || nombre.length === 0 || !this.regEx.test(url) || url.length === 0) {

      if (nombre.length > 10 || nombre.length === 0 ) {
        this.help = 'El nombre debe contener entre 1 y 10 carácteres *';
        this.errorName = true;
        if (this.regEx.test(url)) {
          this.errorUrl = false;
          this.urlText = 'Introduce la URL completa del producto';
        }
      }
      if (!this.regEx.test(url)) {
        this.errorUrl = true;
        this.urlText = 'Debes introducir una url correcta *';
        if (nombre.length < 10 && nombre.length !== 0) {
          this.errorName = false;
          this.help = 'Introduce el nombre que quieres que tenga el producto';
        }
      }
    } else {
      console.log("en component la url es " + url);
      
      this.errorName = false;
      this.errorUrl = false;
      this.urlText = 'Introduce la URL completa del producto';
      this.help = 'Introduce el nombre que quieres que tenga el producto';
      this.trackerService.getPriceTag(url).subscribe(data => {
        const priceTag = data.priceTag;
        console.log(priceTag);
        this.trackerService.saveItem(url, nombre, priceTag);
        this.getItemsOfUser();
    });
  }
  }

  getChart(url: string) {
    this.trackerService.getPricesOfItem(url).subscribe((data: any[]) => {
      const labelsChart = [];
      const precios = [];
      for (let i = 0; i < data.length; i++) {
        let date = data[i].date;
        date = date.split(':');
        let fechaCompleta = date[0] + date[1];
        fechaCompleta = fechaCompleta.replace(/-/g, '/');

        fechaCompleta = fechaCompleta.slice(0, fechaCompleta.indexOf('T') + 3) + ':'
          + fechaCompleta.slice(fechaCompleta.indexOf('T') + 3, fechaCompleta.length);

        fechaCompleta = fechaCompleta.replace('T', ' ');

        labelsChart.push(fechaCompleta);

        if (this.chart) {
          this.chart.destroy();
        }
        precios.push(data[i].currentPrice);

      }
      const ctx = 'myCanvas';
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labelsChart,
          datasets: [
            {
              data: precios,
              borderColor: '#2171f2',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxis: [{
              display: true
            }]
          }
        }
      });
    });
  }

  getItemsOfUser() {
    this.trackerService.getItemsOfUser(this.trackerService.getUserName(), this.trackerService.getUserEmail()).subscribe((data: any[]) => {
      this.items = data;
    });
  }
  deleteItem(name: string) {
    this.trackerService.deleteItem(name).subscribe(() => {
      this.getItemsOfUser();
    });
  }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      document.cookie = 'email=' + this.profile.email + ';';
      document.cookie = 'name=' + this.profile.name + ';';
      this.trackerService.saveUser(this.profile.name, this.profile.email).subscribe(data => {});

    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        document.cookie = 'email=' + this.profile.email + ';';
        document.cookie = 'name=' + this.profile.name + ';';
        this.trackerService.saveUser(this.profile.name, this.profile.email).subscribe(data => {});
        this.getItemsOfUser();
        console.log(this.profile);
      });
    }
  }

  ngAfterViewInit() {
    this.getItemsOfUser();
  }
}


