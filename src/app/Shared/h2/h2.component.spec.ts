import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H2Component } from './h2.component';

describe('H2Component', () => {
  let component: H2Component;
  let fixture: ComponentFixture<H2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [H2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(H2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
