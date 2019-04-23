import {AfterViewInit, Component, OnInit} from '@angular/core';
import {forkJoin} from 'rxjs';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {HeroDataService} from '../hero-data.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-layered-histogram-chart',
  templateUrl: './layered-histogram-chart.component.html',
  styleUrls: ['./layered-histogram-chart.component.less']
})
export class LayeredHistogramChartComponent implements OnInit, AfterViewInit {
  chart: am4charts.XYChart;
  exactData: any;
  rangeData: any;
  slideIndex = 1;
  DataSet: any;
  realData: any;
  unifiedData: any;

  constructor(private HeroService: HeroDataService, private http: HttpClient) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.unifiedData = [];
    const exact = this.http.get('./assets/softbin_histogram_data.json');
    const range = this.http.get('./assets/testparameter_histogram_data.json');
    const real = this.http.get('./assets/HistogramData.json');
    forkJoin([exact, range, real]).subscribe(results => {
      this.exactData = results[0][`content`];
      this.rangeData = results[1][`content`];
      this.realData = results[2];
      let j = 0;
      console.log(j);

      // for ( j; j < this.exactData.length - 1; j++) {
      //   console.log(this.exactData[j].count);
      //   this.exactData[j].count  = this.exactData[j].count  * 1475 * j;
      //   this.exactData[j].count2 = this.exactData[j].count2 * 1475 * j;
      // }
      this.showSlides(this.slideIndex);
    });
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {

    let i;
    // const slides = document.getElementsByClassName('myChart');
    const dots = document.getElementsByClassName('dot');
    this.DataSet = [];
    console.log(this.DataSet);
    this.chart = am4core.create('layHisdiv', am4charts.XYChart);

    if (n > dots.length) {
      console.log(n);
      console.log(this.slideIndex);
      this.slideIndex = 1;
    } else if (n < 1) {
      console.log(n);
      console.log(this.slideIndex);
      this.slideIndex = dots.length;
    }

    if (this.slideIndex == 1) {
      console.log(this.slideIndex);
      this.DataSet = [];
      this.DataSet = this.exactData.slice(0, this.exactData.length - 1);
      console.table(this.exactData);
      this.DataSet.sort((a, b) => b.count - a.count);
    } else if (this.slideIndex == 2) {
      console.log(this.slideIndex);
      this.DataSet = [];
      // this.rangeData.sort((a, b) => {
      // console.log(a.category.split('..', 1) + ' : a   b: ' + b.category.split('..', 1));
      //   return parseFloat(a.category.split('..', 1)) - parseFloat(b.category.split('..', 1));
      // });
      console.table(this.realData.value);
      this.realData.value.sort((a, b) => {
        // console.log(a.category.split('..', 1) + ' : a   b: ' + b.category.split('..', 1));
        return parseFloat(a.category.split('..', 1)) - parseFloat(b.category.split('..', 1));
      });
      console.table(this.realData.value);

      // this.DataSet = this.rangeData.slice(0, this.rangeData.length - 1 );
      this.DataSet = this.realData.value.slice(0, this.realData.value.length - 1);

      console.table(this.rangeData);
      console.log(this.DataSet);
    }

    this.DataSet.unshift({category: null, count: 0, count2: 0});
    this.DataSet.push({category: null, count: 0, count2: 0});
    this.chart.data = this.DataSet;
    console.table(this.chart.data);

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    // @ts-ignore
    dots[this.slideIndex - 1].className += ' active';
    this.CreateChart();

  }

  CreateChart() {
// Create axes
    const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    const series = this.chart.series.push(new am4charts.ColumnSeries());
    const series2 = this.chart.series.push(new am4charts.ColumnSeries());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.title.text = 'Category';
    categoryAxis.renderer.labels.template.fontWeight = 'bold';

    valueAxis.title.text = 'count and count2';
    valueAxis.title.fontWeight = 'bold';
    valueAxis.strictMinMax = true;

    series.dataFields.valueY = 'count';
    series.dataFields.categoryX = 'category';
    series.clustered = false;
    series.tooltipText = 'category:  [bold]{categoryX}[/] \n count: \t\t     [bold]{valueY}[/]';
    series.columns.template.width = am4core.percent(100);
    series.columns.template.fill = am4core.color('#FF6D69');
    series.columns.template.opacity = 0.9;

    series2.dataFields.valueY = 'count2';
    series2.dataFields.categoryX = 'category';
    series2.clustered = false;
    series2.columns.template.width = am4core.percent(60);
    series2.tooltipText = 'category:  [bold]{categoryX}[/] \n count2: \t\t     [bold]{valueY}[/]';
    series2.columns.template.fill = am4core.color('#9674F3');
    series2.columns.template.opacity = 0.6;

    if (!this.DataSet[(this.DataSet.length / 2).toFixed(0)].category.toString().includes('..')) {
      categoryAxis.renderer.minGridDistance = 30;
      valueAxis.renderer.minGridDistance = 40;

// Create series
      series.tooltip.fontSize = '15px';
      series2.tooltip.fontSize = '15px';

      this.exactData.forEach(e => {
        this.unifiedData.push(e.count);
        this.unifiedData.push(e.count2);
      });
      this.unifiedData.sort((a, b) => {
          return b - a;
        }
      );
      let axisBreak = valueAxis.axisBreaks.create();
      axisBreak.endValue = parseFloat((this.unifiedData[0] * .98).toFixed(2));
      let li: number;
      for (li = this.unifiedData.length - 1; li > 0; li--) {
        if (parseFloat((this.unifiedData[li] * 1.05).toFixed(2)) !== 0) {

          axisBreak.startValue = parseFloat((this.unifiedData[0] * .18).toFixed(2));
          console.log(axisBreak.startValue);
          break;
        }
      }
      axisBreak.breakSize = 0.005;
      axisBreak.defaultState.transitionDuration = 1000;
      // make break expand on hover
      let hoverState = axisBreak.states.create('hover');
      hoverState.properties.breakSize = 2;
      hoverState.properties.opacity = 0.1;
      hoverState.transitionDuration = 1500;
      // let c = 0;
      // let mean = (this.unifiedData[0] - this.unifiedData[this.unifiedData.length - 1]) / 2;
      // let Cond1;
      // let Cond2;
      // let i = 1 ;
      // let intervalY: number;
      // let accumulatedInterval: number;
      // intervalY = this.unifiedData[this.unifiedData.length - 1] / this.unifiedData.length;
      // for (c; c < this.unifiedData.length - 2; c++) {
      // If the difference not more than or equal to 50%
      // Cond1 = ((this.unifiedData[c] - this.unifiedData[c + 1]) / (this.unifiedData[c] / 2) >= 0.5);
      // Cond2 = this.unifiedData[c] >= (mean * 0.4);
      // if ( Cond1 && Cond2 ) {
      // console.log(this.unifiedData[c] + ' - ' + this.unifiedData[c + 1] + ' / ' +  this.unifiedData[c] + ' = ' + ((this.unifiedData[c] - this.unifiedData[c + 1]) / this.unifiedData[c]));
      // console.log( this.unifiedData[c]);
      // let axisBreak = valueAxis.axisBreaks.create();
      // console.log((this.unifiedData[c + 1] * 1.2).toFixed(2));
      // axisBreak.startValue = parseFloat((this.unifiedData[c + 1] * 1.05).toFixed(2));
      // axisBreak.endValue = parseFloat((this.unifiedData[c] * 0.98).toFixed(2));
      // axisBreak.breakSize = 0.002 * i * 2;
      // i++;


      // axisBreak.defaultState.transitionDuration = 1000;
      // let hoverState = axisBreak.states.create('hover');
      // hoverState.properties.breakSize = 1;
      // hoverState.properties.opacity = 0.1;
      // hoverState.transitionDuration = 1500;
      // break;
      // }
      // }
      console.table(this.unifiedData);
      // let axisBreak = valueAxis.axisBreaks.create();
      // let axisBreak2 = valueAxis.axisBreaks.create();
      // axisBreak.startValue = 0.4;
      // axisBreak.endValue = 0.8;
      // axisBreak.breakSize = 0.005;
      // axisBreak.defaultState.transitionDuration = 1000;
      // axisBreak2.startValue = 0.14;
      // axisBreak2.endValue = 0.35;
      // axisBreak2.breakSize = 0.005;
      // axisBreak2.defaultState.transitionDuration = 1000;

      // make break expand on hover
      // let hoverState = axisBreak.states.create('hover');
      // hoverState.properties.breakSize = 2;
      // hoverState.properties.opacity = 0.1;
      // hoverState.transitionDuration = 1500;
      // let hoverState2 = axisBreak2.states.create('hover');
      // hoverState2.properties.breakSize = 1.3255;
      // hoverState2.properties.opacity = 0.1;
      // hoverState2.transitionDuration = 1500;

    } else {
      // Setting for range Daa
      categoryAxis.renderer.labels.template.fontSize = '8px';
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.renderer.labels.template.rotation = -10;
      categoryAxis.renderer.grid.template.width = .5;

      valueAxis.renderer.minGridDistance = 20;
// Create series
      series.tooltip.fontSize = '12px';
      series2.tooltip.fontSize = '12px';
    }
    this.chart.cursor = new am4charts.XYCursor();
  }
}
