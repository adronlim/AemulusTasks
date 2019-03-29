import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HStateComponent } from './h-state.component';

describe('HStateComponent', () => {
  let component: HStateComponent;
  let fixture: ComponentFixture<HStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
