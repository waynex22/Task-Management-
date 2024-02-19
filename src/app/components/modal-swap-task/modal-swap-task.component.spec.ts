import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSwapTaskComponent } from './modal-swap-task.component';

describe('ModalSwapTaskComponent', () => {
  let component: ModalSwapTaskComponent;
  let fixture: ComponentFixture<ModalSwapTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSwapTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSwapTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
