import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartHeroComponent } from './chart-hero.component';

describe('ChartHeroComponent', () => {
  let component: ChartHeroComponent;
  let fixture: ComponentFixture<ChartHeroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartHeroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
