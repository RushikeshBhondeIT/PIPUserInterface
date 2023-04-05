import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeapYearComponent } from './leap-year.component';

describe('LeapYearComponent', () => {
  let component: LeapYearComponent;
  let fixture: ComponentFixture<LeapYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeapYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeapYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
