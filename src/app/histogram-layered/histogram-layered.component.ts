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
    this.showSlides(this.slideIndex);

    forkJoin([exact, range]).subscribe(results => {
      this.exactData = results[0]['content'];
      console.log(this.exactData);
      console.log(typeof this.exactData);

      this.rangeData = results[1]['content'];
      console.log(this.rangeData);
// Create FIRST chart instance
      this.chart = am4core.create('layHisdiv1', am4charts.XYChart);
      this.exactData.sort((a, b) => a.category - b.category);
      this.exactData.unshift({category: null, count: 0, count2: 0});
      this.exactData.push({category: null, count: 0, count2: 0});
// Add data
      this.chart.data = this.exactData;
      console.log(this.exactData);

// Create axes
      const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'category';
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;
      categoryAxis.title.text = 'count and count2';
      const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = 'Category';
      valueAxis.title.fontWeight = 'bold';
      valueAxis.strictMinMax = true;
      valueAxis.renderer.minGridDistance = 30;

// Create series
      const series = this.chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = 'count';
      series.dataFields.categoryX = 'category';
      series.clustered = false;
      series.tooltipText = 'category:  [bold]{categoryX}[/] \n count: \t\t     [bold]{valueY}[/]';
      series.tooltip.fontSize = '15px';
      series.columns.template.width = am4core.percent(100);
      series.columns.template.fill = am4core.color('#FF6D69');
      series.columns.template.opacity = 0.9;

      const series2 = this.chart.series.push(new am4charts.ColumnSeries());
      series2.dataFields.valueY = 'count2';
      series2.dataFields.categoryX = 'category';
      series2.clustered = false;
      series2.columns.template.width = am4core.percent(60);
      series2.tooltipText = 'category:  [bold]{categoryX}[/] \n count2: \t\t     [bold]{valueY}[/]';
      series2.tooltip.fontSize = '15px';
      series2.columns.template.fill = am4core.color('#9674F3');
      series2.columns.template.opacity = 0.6;

// axis break
      let axisBreak = valueAxis.axisBreaks.create();
      axisBreak.startValue = 0.4;
      axisBreak.endValue = 0.8;
      axisBreak.breakSize = 0.005;
      let axisBreak2 = valueAxis.axisBreaks.create();
      axisBreak2.startValue = 0.15;
      axisBreak2.endValue = 0.35;
      axisBreak2.breakSize = 0.01;

      axisBreak.defaultState.transitionDuration = 1000;
      // make break expand on hover
      let hoverState = axisBreak.states.create('hover');
      hoverState.properties.breakSize = 5;
      hoverState.properties.opacity = 0.1;
      hoverState.transitionDuration = 1500;
      let hoverState2 = axisBreak2.states.create('hover');
      hoverState2.properties.breakSize = 1;
      hoverState2.properties.opacity = 0.1;
      hoverState2.transitionDuration = 1500;


      this.chart.cursor = new am4charts.XYCursor();
      // this.chart.scrollbarY = new am4core.Scrollbar();
      // this.chart.scrollbarX = new am4core.Scrollbar();
      // this.chart.scrollbarX.disabled = true;
      console.log(this.rangeData);

      // **********************Create SECOND chart instance******************************************************************************************************************************
      this.chart2 = am4core.create('layHisdiv2', am4charts.XYChart);
      console.log(this.rangeData);
      this.rangeData.sort((a, b) => {
        // console.log(a.category.split('..', 1) + ' : a   b: ' + b.category.split('..', 1));
        return parseFloat(a.category.split('..', 1)) - parseFloat(b.category.split('..', 1));
      });

      console.log(this.rangeData);
      this.rangeData.unshift({category: null, count: 0, count2: 0});
      this.rangeData.push({category: null, count: 0, count2: 0});
      // Add data

      this.chart2.data = this.rangeData;

      console.log(this.rangeData);

// Create axes
      const categoryAxis2 = this.chart2.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis2.dataFields.category = 'category';
      categoryAxis2.renderer.labels.template.fontSize = '8px';
      categoryAxis2.renderer.labels.template.fontWeight = 'bold';
      categoryAxis2.renderer.grid.template.location = 0;
      categoryAxis2.renderer.minGridDistance = 20;
      categoryAxis2.title.text = 'count and count2';
      categoryAxis2.renderer.labels.template.rotation = -10;
      categoryAxis2.renderer.grid.template.width = .5;

      const valueAxis2 = this.chart2.yAxes.push(new am4charts.ValueAxis());
      valueAxis2.title.text = 'Category';
      valueAxis2.title.fontWeight = 'bold';
      valueAxis2.strictMinMax = true;
      valueAxis2.renderer.minGridDistance = 50;

// Create series
      // @ts-ignore
      const seriesC1 = this.chart2.series.push(new am4charts.ColumnSeries());
      seriesC1.dataFields.valueY = 'count';
      seriesC1.dataFields.categoryX = 'category';
      seriesC1.clustered = false;
      seriesC1.tooltipText = 'category:  [bold]{categoryX}[/] \n count: \t\t     [bold]{valueY}[/]';
      seriesC1.tooltip.fontSize = '12px';
      seriesC1.columns.template.width = am4core.percent(100);
      seriesC1.columns.template.fill = am4core.color('#FF6D69');
      ;
      seriesC1.columns.template.opacity = 0.9;

      // @ts-ignore
      const seriesC2 = this.chart2.series.push(new am4charts.ColumnSeries());
      seriesC2.dataFields.valueY = 'count2';
      seriesC2.dataFields.categoryX = 'category';
      seriesC2.clustered = false;
      seriesC2.columns.template.width = am4core.percent(60);
      seriesC2.tooltipText = 'category:  [bold]{categoryX}[/] \n count2: \t\t     [bold]{valueY}[/]';
      seriesC2.tooltip.fontSize = '12px';
      seriesC2.columns.template.fill = am4core.color('#9674F3');
      seriesC2.columns.template.opacity = 0.6;

      this.chart2.cursor = new am4charts.XYCursor();
      //   this.chart2.scrollbarY = new am4core.Scrollbar();
      //   this.chart2.scrollbarX = new am4core.Scrollbar();
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
    const slides = document.getElementsByClassName('myChart');
    const dots = document.getElementsByClassName('dot');
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      // @ts-ignore
      slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    // @ts-ignore
    slides[this.slideIndex - 1].style.display = 'block';
    dots[this.slideIndex - 1].className += ' active';
  }
}

