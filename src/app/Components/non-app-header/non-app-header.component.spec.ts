import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAppHeaderComponent } from './non-app-header.component';

describe('NonAppHeaderComponent', () => {
  let component: NonAppHeaderComponent;
  let fixture: ComponentFixture<NonAppHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonAppHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonAppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
