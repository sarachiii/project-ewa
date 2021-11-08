import {Workfield} from "./workfield";

/**
 * This is the user class. It generates a hardcoded logged in user and a random user.
 *
 * @author Sarah Chrzanowska-Buth
 */

export class User {

  public userId: number = 1000;
  public name: string;
  public workfield: Workfield;

  constructor(userId: number, name: string = "", workfield: Workfield = Workfield.AGRONOMY) {
    this.userId = userId;
    this.name = name;
    this.workfield = workfield;
  }

  public static generateLoggedInUser(userId = 0) {
    let workField = Workfield.BOTANY;
    let name = "Sjors";
    return new User(userId, name, workField);
  }

  public static generateRandomUser(userId = 0) {
    const enumValues = Object.values(Workfield); //list of enum workfield values
    const number = Math.floor(Math.random() * enumValues.length); //create random number for the values
    let workfield = enumValues[number]; //pick a ranom workfield from the enum
    let name = "Username";
    return new User(userId, name, workfield);
  }
}
