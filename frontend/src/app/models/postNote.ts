export class PostNote {

  public noteId: number;
  public userId: number;
  public timestamp: Date;
  public title: string;
  public noteText: string;


  constructor(noteId: number, userId: number, timestamp: Date, title: string, noteText: string) {
    this.noteId = noteId;
    this.userId = userId;
    this.timestamp = timestamp;
    this.title = title;
    this.noteText = noteText;
  }
}
