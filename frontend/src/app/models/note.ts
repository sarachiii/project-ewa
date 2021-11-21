export class Note {

  public noteId: number;
  public userId: number;
  public workfield: string;
  public timestamp: Date;
  public title: string;
  public noteText: string;
  public username: string;

  constructor(noteId: number, userId: number, workfield: string, timestamp: Date, title: string, noteText: string, username: string) {
    this.noteId = noteId;
    this.userId = userId;
    this.workfield = workfield;
    this.timestamp = timestamp;
    this.title = title;
    this.noteText = noteText;
    this.username = username;
  }

  convertedDate(locale: string = 'en-GB'): string {
    let options: Intl.DateTimeFormatOptions = {
      day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'
    }
    return new Date(this.timestamp).toLocaleString(locale, options);
  }

  static copyConstructor(note: Note): Note {
    // console.log(note.timestamp)
    // let date = Note.convertDate(new Date(note.timestamp));
    // console.log(date)
    // console.log(new Date(note.timestamp))
    /*let hour = '' + ( + note.timestamp[3] < 10 ? '0' : '') + note.timestamp[3];
    let minute = '' + ( + note.timestamp[4] < 10 ? '0' : '') + note.timestamp[4];
    let months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = note.timestamp[2] + " " + months[note.timestamp[1]] + " " + note.timestamp[0] + ", " + hour + ":" + minute;*/
    return Object.assign(new Note(note.noteId, note.userId, note.workfield, note.timestamp, note.title, note.noteText, note.username));
  }
}
