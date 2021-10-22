import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesNavbarComponent } from './notes-navbar.component';

describe('NotesNavbarComponent', () => {
  let component: NotesNavbarComponent;
  let fixture: ComponentFixture<NotesNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
