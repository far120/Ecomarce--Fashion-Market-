import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBrandOwnerComponent } from './category-brand-owner.component';

describe('CategoryBrandOwnerComponent', () => {
  let component: CategoryBrandOwnerComponent;
  let fixture: ComponentFixture<CategoryBrandOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryBrandOwnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryBrandOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
