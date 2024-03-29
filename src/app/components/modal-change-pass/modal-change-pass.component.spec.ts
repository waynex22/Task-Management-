import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangePassComponent } from './modal-change-pass.component';

describe('ModalChangePassComponent', () => {
  let component: ModalChangePassComponent;
  let fixture: ComponentFixture<ModalChangePassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalChangePassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalChangePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
