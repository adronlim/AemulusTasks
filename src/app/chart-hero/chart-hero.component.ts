import {AfterViewChecked, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {BreakpointObserver} from '@angular/cdk/layout';

am4core.useTheme(am4themes_animated);
am4core.options.autoSetClassName = true;

@Component({
  selector: 'app-chart-hero',
  templateUrl: './chart-hero.component.html',
  styleUrls: ['./chart-hero.component.less']
})
export class ChartHeroComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @Input() data: any = [[], []];
  @Input() yValue: any;
  @Input() Hkey: string;
  stack = false;
  Chart: am4charts.XYChart;
  chartData: any = [];

  constructor(public breakpointObserver: BreakpointObserver) {
  }

  ngAfterViewInit() {

    console.log(this.yValue);
    let yFullName: string;
    let chartColor: string;
    // const x = window.matchMedia('(max-width: 875px)');
    console.log(this.data);
    console.log(this.yValue.statName);
    if (this.yValue.statName === 'Strength') {
      this.Chart = am4core.create(this.yValue.statName, am4charts.XYChart);
    } else if (this.yValue.statName === 'Agility') {
      this.Chart = am4core.create(this.yValue.statName, am4charts.XYChart);
    } else if (this.yValue.statName === 'Intelligence') {
      this.Chart = am4core.create(this.yValue.statName, am4charts.XYChart);
    } else {
      return;
    }
    let chart: am4charts.XYChart;
    chart = this.Chart;
    chart.percentWidth = 90;
    chart.align = 'center';
    chart.scrollbarX = new am4core.Scrollbar();
    chart.align = 'center';
    chart.responsive.enabled = true;
    chart.fontFamily = 'Calibri, serif';
    chart.fontWeight = 'lighter';
    let i = 0;


    for (const HeroD of this.data) {
      for (const hd of HeroD) {
        this.chartData[i] = hd;
        i++;
      }
    }

    if (this.yValue.statName == 'Strength') {
      this.chartData.sort((a, b) => a.str - b.str);
    } else if (this.yValue.statName == 'Agility') {
      this.chartData.sort((a, b) => a.ag - b.ag);
    } else if (this.yValue.statName == 'Intelligence') {
      this.chartData.sort((a, b) => a.int - b.int);
    }
    chart.data = this.chartData;

    console.log(chart);
    switch (this.yValue.statName) {
      case 'Strength': {
        yFullName = this.yValue.statName;
        chartColor = this.yValue.statColor;
        break;
      }
      case 'Agility': {
        yFullName = this.yValue.statName;
        chartColor = this.yValue.statColor;
        break;
      }
      case 'Intelligence': {
        yFullName = this.yValue.statName;
        chartColor = this.yValue.statColor;
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
    categoryAxis.renderer.labels.template.horizontalCenter = 'right';
    categoryAxis.renderer.labels.template.verticalCenter = 'middle';
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.fontSize = '20px';

    // this.breakpointObserver
    //   .observe(['(max-width: 1200px)'])
    //   .subscribe((state: BreakpointState) => {
    //     if (state.matches) {
    //       categoryAxis.fontSize = '15px';
    //       // categoryAxis.renderer.labels.template.adapter.add('dy', (dy, target) => {
    //       //   if (target.dataItem && target.dataItem.index & Number(2 == 2)) {
    //       //     return dy + 25;
    //       //   }
    //       //   return dy;
    //       // });
    //     } else {
    //       console.log('900 above');
    //     }
    //   });


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
    series.sequencedInterpolation = true;
    series.dataFields.valueY = this.Hkey;
    series.dataFields.categoryX = 'name';
    // series.fontSize = '50px';
    series.name = yFullName;
    series.fill = am4core.color(chartColor);
    // series.yAxis =
    series.columns.template.tooltipText = '{categoryX}: [bold]{valueY}[/]';
    series.columns.template.strokeWidth = 0;
    series.tooltip.pointerOrientation = 'vertical';
    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.fillOpacity = .8;


    const columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 1;
    columnTemplate.strokeOpacity = .5;
    columnTemplate.width = am4core.percent(100);

    // on hover, make corner radiuses bigger
    const hoverState = series.columns.template.column.states.create('hover');
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    // Cursor
    chart.cursor = new am4charts.XYCursor();
  }

  ngAfterViewChecked() {
  }
  ngOnInit() {}
}
