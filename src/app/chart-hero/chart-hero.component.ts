import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';


am4core.useTheme(am4themes_animated);
am4core.options.autoSetClassName = true;

@Component({
  selector: 'app-chart-hero',
  templateUrl: './chart-hero.component.html',
  styleUrls: ['./chart-hero.component.less']
})
export class ChartHeroComponent implements OnInit, AfterViewInit {
  @Input() data: any = [[], []];
  @Input() yValue: string;
  Chart: am4charts.XYChart;
  chartData: any = [];
  constructor() {
    console.clear();
  }
  ngAfterViewInit() {
    console.log(this.yValue);
    let yFullName: string;
    let chartColor: string;

    if (this.yValue == 'str') {
      this.Chart = am4core.create( this.yValue, am4charts.XYChart);
    } else if (this.yValue == 'ag') {
      this.Chart = am4core.create('ag', am4charts.XYChart);
    } else if (this.yValue == 'int') {
      this.Chart = am4core.create('int', am4charts.XYChart);
    } else {
      return;
    }
    let chart: am4charts.XYChart;
    chart = this.Chart;
    chart.responsive.enabled = false;
    chart.fontFamily = 'Calibri, serif';
    chart.fontWeight = 'lighter';
    let i = 0;
    console.log( chart);
    console.log(this.data);

    for (const HeroD of this.data) {
      for (const hd of HeroD) {
        this.chartData[i] = hd;
        i++;
      }
    }
    if (this.yValue == 'str') {
      this.chartData.sort((a, b) => a.str - b.str);
    } else if (this.yValue == 'ag') {
      this.chartData.sort((a, b) => a.ag - b.ag);
    } else {
      this.chartData.sort((a, b) => a.int - b.int);
    }

    chart.data = this.chartData;
    let title;

    console.log(chart.data);
    console.log(chart);
    switch (this.yValue) {
      case 'str': {
        yFullName = 'Strength';
        chartColor = '#FE5257';
        break;
      }
      case 'ag': {
        yFullName = 'Agility';
        chartColor = '#54EC4C';
        break;
      }
      case 'int': {
        yFullName = 'Intelligence';
        chartColor = '#9BA2FF';
        break;
      }
      default: {
        return;
      }
    }
// Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'name';
    categoryAxis.fontSize = '20px';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    console.log(chart.data);
    let i = 0;
    categoryAxis.renderer.labels.template.adapter.add('dy', (dy, target) => {
      // console.log(target.dataItem.index);
      // console.log('%c' + i, 'background: #222; color: #bada55');
      // console.log('%c' + (target.dataItem.index & Number(2 == 2)), 'color: red' );
      i++;
      if (i % 50 === 0) {
        // console.clear();
      }
      if (target.dataItem && target.dataItem.index & Number(2 == 2)) {
        // console.log(target.dataItem.index);
        // console.log(target.dataItem.index);
        // console.log(target.dataItem.index & Number(2 == 2));
        // console.log(dy);
        // console.log(i);
        // i++;

        return dy + 25;
      }
      return dy;
    });
    console.log(categoryAxis);

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.fontSize = '20px';

    const topContainer = chart.chartContainer.createChild(am4core.Container);
    topContainer.layout = 'absolute';
    topContainer.toBack();
    topContainer.paddingBottom = 15;
    topContainer.width = am4core.percent(100);

    const Title = topContainer.createChild(am4core.Label);
    Title.text = yFullName;
    Title.fontSize = '40px';
    Title.fontWeight = '600';
    Title.align = 'center';
    Title.paddingBottom = 60;

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = this.yValue;
    series.dataFields.categoryX = 'name';
    // series.fontSize = '50px';
    series.name = yFullName;
    series.fill = am4core.color(chartColor);
    // series.stroke = chart.colors.getIndex(0).lighten(0.5);
    // series.yAxis =
    series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
    series.columns.template.fillOpacity = .8;

    const columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 1;
    columnTemplate.strokeOpacity = .5;
    columnTemplate.width = am4core.percent(100);
  }

  ngOnInit() {}
}
