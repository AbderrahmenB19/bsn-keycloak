import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBorrowedBookComponent } from './my-borrowed-book.component';

describe('MyBorrowedBookComponent', () => {
  let component: MyBorrowedBookComponent;
  let fixture: ComponentFixture<MyBorrowedBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyBorrowedBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyBorrowedBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
