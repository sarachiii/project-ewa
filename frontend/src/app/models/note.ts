export class Note {

  public noteId: number;
  public userId: number;
  public workfield: string;
  public timestamp: string;
  public title: string;
  public noteText: string;

  constructor(noteId: number, userId: number, workfield: string, timestamp: string, title: string, noteText: string) {
    this.noteId = noteId;
    this.userId = userId;
    this.workfield = workfield;
    this.timestamp = timestamp;
    this.title = title;
    this.noteText = noteText;
  }

  static copyConstructor(note: Note): Note {
    //TODO: reformat the timestamp to a readable string
    return Object.assign(new Note(note.noteId, note.userId, note.workfield, note.timestamp, note.title, note.noteText));
  }
}
