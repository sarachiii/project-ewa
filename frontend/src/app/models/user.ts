import { Preferences } from "./preferences";

export enum Role {
  ADMIN = "admin",
  TEAM_LEADER = "team_leader",
  TEAM_MEMBER = "team_member"
}

export class User {
  id: number;
  teamId: number;
  role: Role; // TODO: Add custom validator for role in teams
  specialty: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  profilePicture: string;
  preferences: Preferences;

  constructor(userId: number, teamId: number, role: Role, specialty: string, firstName: string, lastName: string,
              emailAddress: string, password: string, profilePicture?: string, preferences?: Preferences) {
    this.id = userId;
    this.teamId = teamId;
    this.role = role;
    this.specialty = specialty;
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAddress = emailAddress;
    this.password = password;
    this.profilePicture = profilePicture || '';
    this.preferences = preferences || new Preferences(userId);
  }
}
