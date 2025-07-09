import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogerUserComponent } from './loger-user.component';

describe('LogerUserComponent', () => {
  let component: LogerUserComponent;
  let fixture: ComponentFixture<LogerUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogerUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogerUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
