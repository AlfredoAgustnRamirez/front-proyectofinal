import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentasListarComponent } from './ventas-listar.component';

describe('ListarVentasComponent', () => {
  let component: VentasListarComponent;
  let fixture: ComponentFixture<VentasListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
