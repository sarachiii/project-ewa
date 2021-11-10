import { Preferences } from "./preferences";

export enum Role {
  ADMIN = "admin",
  TEAM_LEADER = "team_leader",
  TEAM_MEMBER = "team_member"
}

export class User {
  userId: number;
  role: Role;
  specialty: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  emailAddress: string;
  password: string;
  preferences: Preferences;


  constructor(userId: number, role: Role, specialty: string, firstName: string, lastName: string,
              profilePicture: string, emailAddress: string, password: string, preferences?: Preferences) {
    this.userId = userId;
    this.role = role;
    this.specialty = specialty;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profilePicture = profilePicture;
    this.emailAddress = emailAddress;
    this.password = password;
    this.preferences = preferences || new Preferences(userId);
  }

  toParsedJSON() {
    return JSON.parse(JSON.stringify(this));
  }
}
