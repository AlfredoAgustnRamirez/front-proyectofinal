import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercializacionComponent } from './comercializacion.component';

describe('ComercializacionComponent', () => {
  let component: ComercializacionComponent;
  let fixture: ComponentFixture<ComercializacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComercializacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComercializacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
