import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { TrackerService } from '../../services/tracker.service';

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.sass']
})
export class TrackerComponent implements OnInit {

  profile: any;

  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
  ]
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  html: any;
  constructor(private trackerService: TrackerService,
              private auth: AuthService) {}

  getPrice() {
    this.trackerService.getPrice();
  }


  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      console.log(this.profile);
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        console.log(this.profile);
      });
    }
  }

}


