import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LayeredHistogramChartComponent} from './layered-histogram-chart.component';

describe('LayeredHistogramChartComponent', () => {
  let component: LayeredHistogramChartComponent;
  let fixture: ComponentFixture<LayeredHistogramChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayeredHistogramChartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayeredHistogramChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
