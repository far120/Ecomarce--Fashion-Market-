import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenviewownerComponent } from './openviewowner.component';

describe('OpenviewownerComponent', () => {
  let component: OpenviewownerComponent;
  let fixture: ComponentFixture<OpenviewownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenviewownerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenviewownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
