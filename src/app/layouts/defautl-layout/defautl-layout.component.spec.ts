import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefautlLayoutComponent } from './defautl-layout.component';

describe('DefautlLayoutComponent', () => {
  let component: DefautlLayoutComponent;
  let fixture: ComponentFixture<DefautlLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefautlLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefautlLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
