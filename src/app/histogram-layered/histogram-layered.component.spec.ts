import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HistogramLayeredComponent} from './histogram-layered.component';

describe('HistogramLayeredComponent', () => {
  let component: HistogramLayeredComponent;
  let fixture: ComponentFixture<HistogramLayeredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistogramLayeredComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistogramLayeredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
