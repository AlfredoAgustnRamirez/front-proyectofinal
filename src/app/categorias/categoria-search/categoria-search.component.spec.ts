import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaSearchComponent } from './categoria-search.component';

describe('CategoriaSearchComponent', () => {
  let component: CategoriaSearchComponent;
  let fixture: ComponentFixture<CategoriaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
