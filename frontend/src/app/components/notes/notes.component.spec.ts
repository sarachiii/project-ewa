import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NotesComponent} from './notes.component';
import {NotesService} from "../../services/notes.service";

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    let fixture = TestBed.createComponent(NotesComponent);
    let component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should display the specialty of the logged in user first', () => {
    let fixture = TestBed.createComponent(NotesComponent);
    let component = fixture.debugElement.componentInstance;
    let notesService = fixture.debugElement.injector.get(NotesService);
    expect(component).toBeTruthy();
  });
});
