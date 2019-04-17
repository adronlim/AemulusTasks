import {Component, OnInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {HeroDataService} from '../hero-data.service';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-hero-statistic',
  templateUrl: './hero-statistic.component.html',
  styleUrls: ['./hero-statistic.component.less']
})

export class HeroStatisticComponent implements OnInit {
  HeroesDataS: any;
  ChartData: any = [];
  MediaSize: any;
  Str = 'str';
  Ag = 'ag';
  Int = 'int';
  Stacked = 'stacked';
  key: Array<string> = [];
  ChartSetting: Array<string> = [];

  constructor(private HeroService: HeroDataService) {}
  ngOnInit() {
    this.MediaSize = window.innerWidth;

    this.HeroService.getHeroes().subscribe(Data => {
      this.HeroesDataS = Data.HEROES;
      this.ChartSetting = Data.statSetting;
      this.key = Object.keys(this.HeroesDataS[0][0]);
      this.key.splice(0, 2);
      console.log(this.key);
      console.log(this.HeroesDataS);
      console.log(this.ChartSetting);
    });
  }
}
