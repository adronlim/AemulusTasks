import {AfterViewInit, Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {HeroDataService} from '../hero-data.service';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';
import {HttpClient} from '@angular/common/http';

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);

// Themes end

@Component({
  selector: 'app-histogram-layered',
  templateUrl: './histogram-layered.component.html',
  styleUrls: ['./histogram-layered.component.less']
})
export class HistogramLayeredComponent implements DoCheck, OnInit, AfterViewInit, OnChanges {
  chart: am4charts.XYChart;
  chart2: am4charts.XYChart;
  exactData: any;
  rangeData: any;
  slideIndex = 1;
  DataSet: any;
  // let breakData = this.exactData;

  Option: any;
  separatedData: any;
  constructor(private HeroService: HeroDataService, private http: HttpClient) {
  }

  ngOnInit() {
  }

  ngDoCheck() {
  }

  ngOnChanges() {
  }

  ngAfterViewInit() {
    const exact = this.http.get('./assets/softbin_histogram_data.json');
    const range = this.http.get('./assets/testparameter_histogram_data.json');

    forkJoin([exact, range]).subscribe(results => {
      this.exactData = results[0]['content'];
      console.log(this.exactData);
      console.log(typeof this.exactData);

      this.rangeData = results[1]['content'];
      console.table(this.rangeData);
// Create chart instance
      // console.log(breakData);
      // separatedData;
      this.showSlides(this.slideIndex);


      console.table(this.DataSet);
      console.log(this.DataSet.includes('..'));

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
    this.chart = am4core.create('layHisdiv1', am4charts.XYChart);

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
      this.rangeData.sort((a, b) => {
        // console.log(a.category.split('..', 1) + ' : a   b: ' + b.category.split('..', 1));
        return parseFloat(a.category.split('..', 1)) - parseFloat(b.category.split('..', 1));
      });
      this.DataSet = this.rangeData.slice(0, this.rangeData.length - 1);
      console.table(this.rangeData);

      console.log(this.DataSet);
    }

    this.DataSet.unshift({category: null, count: 0, count2: 0});
    this.DataSet.push({category: null, count: 0, count2: 0});
    this.chart.data = this.DataSet;
    console.table(this.chart.data);

    // for (i = 0; i < slides.length; i++) {
    //   // @ts-ignore
    //   slides[i].style.display = 'none';
    // }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    // @ts-ignore
    // slides[this.slideIndex - 1].style.display = 'block';
    dots[this.slideIndex - 1].className += ' active';
    this.CreateChart();
  }


  CreateChart() {

// Create axes
    const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    const series = this.chart.series.push(new am4charts.ColumnSeries());
    const series2 = this.chart.series.push(new am4charts.ColumnSeries());

    if (!this.DataSet[3].category.toString().includes('..')) {
      let axisBreak = valueAxis.axisBreaks.create();
      let axisBreak2 = valueAxis.axisBreaks.create();
      categoryAxis.dataFields.category = 'category';
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.title.text = 'Category';
      valueAxis.title.text = 'count and count2';
      valueAxis.title.fontWeight = 'bold';
      valueAxis.strictMinMax = true;
      valueAxis.renderer.minGridDistance = 40;

// Create series
      series.dataFields.valueY = 'count';
      series.dataFields.categoryX = 'category';
      series.clustered = false;
      series.tooltipText = 'category:  [bold]{categoryX}[/] \n count: \t\t     [bold]{valueY}[/]';
      series.tooltip.fontSize = '15px';
      series.columns.template.width = am4core.percent(100);
      series.columns.template.fill = am4core.color('#FF6D69');
      series.columns.template.opacity = 0.9;

      series2.dataFields.valueY = 'count2';
      series2.dataFields.categoryX = 'category';
      series2.clustered = false;
      series2.columns.template.width = am4core.percent(60);
      series2.tooltipText = 'category:  [bold]{categoryX}[/] \n count2: \t\t     [bold]{valueY}[/]';
      series2.tooltip.fontSize = '15px';
      series2.columns.template.fill = am4core.color('#9674F3');
      series2.columns.template.opacity = 0.6;

      axisBreak.startValue = 0.4;
      axisBreak.endValue = 0.8;
      axisBreak.breakSize = 0.005;
      axisBreak.defaultState.transitionDuration = 1000;

      axisBreak2.startValue = 0.14;
      axisBreak2.endValue = 0.35;
      axisBreak2.breakSize = 0.005;
      axisBreak2.defaultState.transitionDuration = 1000;

      // make break expand on hover
      let hoverState = axisBreak.states.create('hover');
      hoverState.properties.breakSize = 2;
      hoverState.properties.opacity = 0.1;
      hoverState.transitionDuration = 1500;
      let hoverState2 = axisBreak2.states.create('hover');
      hoverState2.properties.breakSize = 1.3255;
      hoverState2.properties.opacity = 0.1;
      hoverState2.transitionDuration = 1500;

    } else {
      categoryAxis.dataFields.category = 'category';
      categoryAxis.renderer.labels.template.fontSize = '8px';
      categoryAxis.renderer.labels.template.fontWeight = 'bold';
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;
      categoryAxis.title.text = 'Category';
      categoryAxis.renderer.labels.template.rotation = -10;
      categoryAxis.renderer.grid.template.width = .5;

      valueAxis.title.text = 'count and count2';
      valueAxis.title.fontWeight = 'bold';
      valueAxis.strictMinMax = true;
      valueAxis.renderer.minGridDistance = 20;

// Create series
//         @ts-ignore
      series.dataFields.valueY = 'count';
      series.dataFields.categoryX = 'category';
      series.clustered = false;
      series.tooltipText = 'category:  [bold]{categoryX}[/] \n count: \t\t     [bold]{valueY}[/]';
      series.tooltip.fontSize = '12px';
      series.columns.template.width = am4core.percent(100);
      series.columns.template.fill = am4core.color('#FF6D69');
      series.columns.template.opacity = 0.9;

      // @ts-ignore
      series2.dataFields.valueY = 'count2';
      series2.dataFields.categoryX = 'category';
      series2.clustered = false;
      series2.columns.template.width = am4core.percent(60);
      series2.tooltipText = 'category:  [bold]{categoryX}[/] \n count2: \t\t     [bold]{valueY}[/]';
      series2.tooltip.fontSize = '12px';
      series2.columns.template.fill = am4core.color('#9674F3');
      series2.columns.template.opacity = 0.6;
    }
    this.chart.cursor = new am4charts.XYCursor();
  }
}

