import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareNotesComponent } from './share-notes.component';

describe('ShareNotesComponent', () => {
  let component: ShareNotesComponent;
  let fixture: ComponentFixture<ShareNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
