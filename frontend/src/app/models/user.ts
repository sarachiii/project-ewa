import { Preferences } from "./preferences";
import {EField} from "./field";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
  UNKNOWN = ""
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

  constructor(userId?: number, teamId?: number, role?: Role, specialty?: string, firstName?: string, lastName?: string,
              emailAddress?: string, password?: string, profilePicture?: string) {
    this.id = userId || 0;
    this.teamId = teamId || 0;
    this.role = role || Role.UNKNOWN;
    this.specialty = specialty || EField.UNKNOWN;
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.emailAddress = emailAddress || "";
    this.password = password || "";
    this.profilePicture = profilePicture || "";
  }
}
