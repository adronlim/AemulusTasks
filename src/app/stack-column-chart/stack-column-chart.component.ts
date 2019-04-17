import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4core from '@amcharts/amcharts4/core';
import {BreakpointObserver} from '@angular/cdk/layout';


@Component({
  selector: 'app-stack-column-chart',
  templateUrl: './stack-column-chart.component.html',
  styleUrls: ['./stack-column-chart.component.less']
})
export class StackColumnChartComponent implements OnInit, AfterViewInit {

  @Input() Sdata: any = [[], []];
  @Input() yValue: string;
  @Input() Skey: Array<string> = [];
  @Input() StatSetting: Array<string> = [];
  Chart: am4charts.XYChart;
  SchartData: any = [];
  StateName: Array<string> = [];
  StateColor: Array<string> = [];

  constructor(public breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.ChartData();
    this.Chart = am4core.create(this.yValue, am4charts.XYChart);
    let chart: am4charts.XYChart;
    chart = this.Chart;
    chart.percentWidth = 95;
    chart.scrollbarX = new am4core.Scrollbar();
    chart.align = 'center';
    chart.responsive.enabled = false;
    chart.fontFamily = 'Calibri, serif';
    chart.fontWeight = 'lighter';
    chart.maskBullets = false;

    let i = 0;
    console.log(chart);
    console.log(this.Sdata);

    for (const HeroD of this.Sdata) {
      for (let hd of HeroD) {
        this.SchartData[i] = hd;
        i++;
      }
    }
    chart.data = this.SchartData;
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

    // console.log(chart.data);
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.line.strokeOpacity = 0.5;
    // valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.renderer.minGridDistance = 40;
    valueAxis.fontSize = '20px';
    valueAxis.calculateTotals = true;

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
    topContainer.toFront();
    topContainer.paddingBottom = 15;
    topContainer.width = am4core.percent(100);

    const Title = topContainer.createChild(am4core.Label);
    Title.text = 'Heroes';
    Title.fontSize = '40px';
    Title.fontWeight = '600';
    Title.align = 'center';
    Title.paddingBottom = 60;
    valueAxis.title.text = 'Stat';

    let ToolTipText: any = '';
    let series;
    let tTip = '';
    for (let h = 0; h < this.Skey.length; h++) {
      series = chart.series.push(new am4charts.ColumnSeries());
      series.name = this.Skey[h];
      series.dataFields.valueY = this.Skey[h];
      series.dataFields.categoryX = 'name';
      series.legendSettings.labelText = this.Skey[h];
      series.legendSettings.itemLabelText = this.Skey[h];
      tTip = tTip + this.Skey[h] + ' : [bold] {' + this.Skey[h] + '} [/]\n ';

      series.fill = am4core.color(this.StateColor[h]);
      series.fillOpacity = 0.8;
      series.stacked = true;
      if (h === this.Skey.length - 1) {
        tTip = tTip + 'Total Value : {valueY.total}';
        series.tooltip.pointerOrientation = 'horizontal';
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color('#000000');
        series.tooltipText = tTip;
      }
    }

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    // Legend
    chart.legend = new am4charts.Legend();
    chart.legend.itemContainers.template.clickable = true;
    chart.legend.position = 'right';
  }

  OnShow(event: any) {
    if (!event.target.matches('.dropdown-toggle')) {
      const dropdown = document.getElementsByClassName('dropdown-content');
      let i;
      for (i = 0; i < dropdown.length; i++) {
        const openDropdown = dropdown[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  onClick(event: MouseEvent) {
    document.getElementById('myDropdown').classList.toggle('show');
    // console.log(event.target);
  }

  ChartData() {
    this.StateName[0] = 'Strength';
    this.StateColor[0] = '#FE5257';
    this.StateName[1] = 'Agility';
    this.StateColor[1] = '#54EC4C';
    this.StateName[2] = 'Intelligence';
    this.StateColor[2] = '#9BA2FF';
  }

}
