import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroStatisticComponent } from './hero-statistic.component';

describe('HeroStatisticComponent', () => {
  let component: HeroStatisticComponent;
  let fixture: ComponentFixture<HeroStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroStatisticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
