import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasItmesComponent } from './ventas-itmes.component';

describe('VentasItmesComponent', () => {
  let component: VentasItmesComponent;
  let fixture: ComponentFixture<VentasItmesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasItmesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasItmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
