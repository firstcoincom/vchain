import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptainAppComponent } from './captain-app.component';

describe('CaptainAppComponent', () => {
  let component: CaptainAppComponent;
  let fixture: ComponentFixture<CaptainAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptainAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptainAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
