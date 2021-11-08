import {User} from "./user";
import {formatDate} from '@angular/common';

/**
 * This is the note class. It generates random notes.
 *
 * @author Sarah Chrzanowska-Buth
 */

export class Note {

  public user: User; //User has: userId, name, workfield
  public id: number = 0;
  public title: string;
  public timestamp: string;
  public noteText: string;
  public onRead: boolean;

  constructor(user: User, id: number, title: string, timestamp: string, noteText: string, onRead: boolean) {
    this.user = user;
    this.id = id;
    this.title = title;
    this.timestamp = timestamp;
    this.noteText = noteText;
    this.onRead = onRead;
  }

  public static generateNoteOfLoggedInUser(id = 0, userId = 0): Note {
    let user = User.generateLoggedInUser(userId);
    let title = "Lorem Ipsum";
    let timestamp = formatDate(Date.now(), 'dd-MM-yyyy HH:mm', 'en-GB');
    let sampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquam dictum turpis, quis viverra " +
      "tortor malesuada at. Donec tristique efficitur pulvinar. Quisque posuere tristique porttitor. Nulla tincidunt purus" +
      " vel quam mollis condimentum. Mauris tempus tincidunt lorem, vel malesuada ligula vestibulum eget. Vestibulum sed mauris " +
      "nulla. Morbi dapibus pulvinar dui et egestas. Morbi non cursus turpis. Maecenas vel elit ex. Vivamus quis interdum orci. " +
      "Aenean tincidunt leo in pretium vehicula. Pellentesque habitant morbi tristique senectus et netus et malesuada " +
      "fames ac turpis egestas. Maecenas faucibus ligula metus, at feugiat mi facilisis ut. Sed erat elit, condimentum eget " +
      "velit a, maximus bibendum mauris. Pellentesque facilisis gravida blandit. Donec mi dui, auctor a pharetra vitae, " +
      "mattis vitae nisl. Vivamus et nisi ultricies, egestas nibh nec, sagittis quam. Aliquam id aliquet justo, in tincidunt ";

    let textLength = sampleText.length;
    let randomLength = Math.floor(Math.random() * textLength);
    let noteText = sampleText.slice(0, randomLength)
    let note = new Note(user, id, title, timestamp, noteText, false)

    return note;
  }

  public static generateNote(id = 0, userId = 0): Note {
    let user = User.generateRandomUser(userId);
    let title = "Lorem Ipsum";
    let timestamp = formatDate(Date.now(), 'dd-MM-yyyy HH:mm', 'en-GB');
    let sampleText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquam dictum turpis, quis viverra " +
      "tortor malesuada at. Donec tristique efficitur pulvinar. Quisque posuere tristique porttitor. Nulla tincidunt purus" +
      " vel quam mollis condimentum. Mauris tempus tincidunt lorem, vel malesuada ligula vestibulum eget. Vestibulum sed mauris " +
      "nulla. Morbi dapibus pulvinar dui et egestas. Morbi non cursus turpis. Maecenas vel elit ex. Vivamus quis interdum orci. " +
      "Aenean tincidunt leo in pretium vehicula. Pellentesque habitant morbi tristique senectus et netus et malesuada " +
      "fames ac turpis egestas. Maecenas faucibus ligula metus, at feugiat mi facilisis ut. Sed erat elit, condimentum eget " +
      "velit a, maximus bibendum mauris. Pellentesque facilisis gravida blandit. Donec mi dui, auctor a pharetra vitae, " +
      "mattis vitae nisl. Vivamus et nisi ultricies, egestas nibh nec, sagittis quam. Aliquam id aliquet justo, in tincidunt ";

    let textLength = sampleText.length;
    let randomLength = Math.floor(Math.random() * textLength);
    let noteText = sampleText.slice(0, randomLength)
    let note = new Note(user, id, title, timestamp, noteText, false)

    return note;
  }
}
