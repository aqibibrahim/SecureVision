import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontpagePage } from './frontpage.page';

describe('FrontpagePage', () => {
  let component: FrontpagePage;
  let fixture: ComponentFixture<FrontpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontpagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
