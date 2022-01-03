import {User} from "./user";

export class Note {

  public noteId: number;
  public user: User;
  public timestamp: Date;
  public title: string;
  public noteText: string;

  constructor(noteId: number, user: User, timestamp: Date, title: string, noteText: string) {
    this.noteId = noteId;
    this.user = user;
    this.timestamp = timestamp;
    this.title = title;
    this.noteText = noteText;
  }

  convertedDate(locale: string = 'en-GB'): string {
    let options: Intl.DateTimeFormatOptions = {
      day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric'
    }
    return new Date(this.timestamp).toLocaleString(locale, options);
  }

  static copyConstructor(note: Note): Note {
    let user = new User(note.user.id, note.user.teamId, note.user.role, note.user.specialty,
      note.user.firstName, note.user.lastName, note.user.emailAddress, note.user.password, note.user.profilePicture);

    return Object.assign(new Note(note.noteId, user, note.timestamp, note.title, note.noteText));
  }
}
