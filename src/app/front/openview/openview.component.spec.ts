import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenviewComponent } from './openview.component';

describe('OpenviewComponent', () => {
  let component: OpenviewComponent;
  let fixture: ComponentFixture<OpenviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
