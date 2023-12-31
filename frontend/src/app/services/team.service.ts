import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {first} from "rxjs/operators";
import {Team} from "../models/team";
import {User} from "../models/user";

@Injectable()
export class TeamService {
  resourceUrl: string;
  private teams: Team[];

  constructor(private http: HttpClient) {
    this.resourceUrl = environment.apiUrl + "/teams";
    this.teams = [];
    this.getAllTeamIds().pipe(first()).subscribe(value => {
      this.teams.push(...value.map(team => Object.assign(new Team(team.id, team.ghId))));
    }, error => {
      console.error(error);
      this.teams = [];
    });
  }

  findAll(): Team[] {
    return this.teams;
  }

  // Request team ids from backend
  getAllTeamIds(): Observable<Team[]> {
    return this.http.get<Team[]>(this.resourceUrl);
  }

  // Request a team by team id
  getTeamById(id: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.resourceUrl}/${id}`);
  }

  // Request team members by id from backend
  getMembersByTeamId(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.resourceUrl}/${id}/users`);
  }

  // Create a new team
  addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.resourceUrl, team);
  }

  // Delete a team
  deleteTeam(id: number | string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.resourceUrl}/${id}`);
  }

  // Add team to the list
  addTeamToList(team: Team): void {
    this.teams.push(team);
  }

  // Remove team from the list
  removeTeamFromList(id: number): void {
    let index = this.teams.findIndex(member => member.id == id);
    this.teams.splice(index, 1);
  }

  getGreenhouseByTeamId(id: number):Observable<Team> {
    return this.http.get<Team>(`${this.resourceUrl}/greenhouse/${id}`);
  }
}
