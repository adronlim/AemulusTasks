import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {HeroDataService} from '../hero-data.service';
import {Hero} from '../../hero';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-hero-statistic',
  templateUrl: './hero-statistic.component.html',
  styleUrls: ['./hero-statistic.component.less']
})

export class HeroStatisticComponent implements OnInit {
  HeroesDataS: any;
  ChartData: any = [];
  Str = 'str';
  Ag = 'ag';
  Int = 'int';

  constructor(private HeroService: HeroDataService) {}
  ngOnInit() {
    this.HeroService.getHeroes().subscribe(Data => {
      this.HeroesDataS = Data.HEROES;
      console.log(Object.values(this.HeroesDataS));
      console.log(this.HeroesDataS);
    });
  }

}
