import { Preferences } from "./preferences";
import {Specialty} from "./specialty";
import {environment} from "../../environments/environment";

export enum Role {
  SUPER_ADMIN = "Super Admin",
  ADMIN = "Admin",
  MEMBER = "Member"
}

export namespace Role {
  export function values(): Role[] {
    return Object.values(Role).filter(value => typeof value == "string") as Role[];
  }

  export function names(): string[] {
    return Object.keys(Role).filter(key => typeof Role[key] == "string");
  }

  export function valueOf(name: string): Role {
    return Role[name];
  }

  export function name(role: Role): string {
    return names().find(name => Role[name] == role);
  }
}

export class User {
  id: number;
  teamId: number;
  role: Role;
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
    this.role = role || Role.MEMBER;
    this.specialty = specialty || "";
    this.firstName = firstName || "";
    this.lastName = lastName || "";
    this.emailAddress = emailAddress || "";
    this.password = password || "";
    this.profilePicture = profilePicture || null;
  }

  get fullName(): string {
    return this.firstName + " " + this.lastName;
  }

  get specialist(): string {
    switch (this.specialty) {
      case Specialty.AGRONOMY:
        return "Agronomist";
      case Specialty.BOTANY:
        return "Botanist";
      case Specialty.GEOLOGY:
        return "Geologist";
      case Specialty.HYDROLOGY:
        return "Hydrologist";
      case Specialty.CLIMATE_SCIENCE:
        return "Climatologist";
      default:
        return "";
    }
  }
}
