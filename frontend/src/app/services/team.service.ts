import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {first} from "rxjs/operators";
import {Team} from "../models/team";
import {User} from "../models/user";

@Injectable()
export class TeamService {
  private resourceUrl: URL;
  private teams: Team[]

  constructor(private httpClient: HttpClient) {
    this.resourceUrl = new URL(environment.apiUrl);
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
    return this.httpClient.get<Team[]>(new URL('/teams', this.resourceUrl).toString());
  }

  // Request team members by id from backend
  getTeamById(id: number): Observable<User[]> {
    return this.httpClient.get<User[]>(new URL(`/teams/${id}`, this.resourceUrl).toString());
  }

  //save(team: Member[])
  //deleteById(id: number)
  //removeMember(teamId, memberId)
  //addMember(teamId, memberId)
}
