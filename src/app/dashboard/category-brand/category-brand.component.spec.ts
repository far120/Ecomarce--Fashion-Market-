import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBrandComponent } from './category-brand.component';

describe('CategoryBrandComponent', () => {
  let component: CategoryBrandComponent;
  let fixture: ComponentFixture<CategoryBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
