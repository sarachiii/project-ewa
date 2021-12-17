import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { first } from "rxjs/operators";

type TeamId = { id: number };
type Member = {
  id: number;
  teamId: number;
  firstName: string;
  lastName: string;
  email: string;
  specialty: string;
};

@Injectable()
export class TeamService {
  private resourceUrl: URL;
  private teams: TeamId[]

  constructor(private httpClient: HttpClient) {
    this.resourceUrl = new URL(environment.apiUrl);
    this.teams = [];
    this.getAllTeamIds().pipe(first()).subscribe(value => {
      this.teams = value;
    }, error => {
      console.error(error);
      this.teams = [];
    });
  }

  findAll(): TeamId[] {
    return this.teams;
  }

  // Request team ids from backend
  getAllTeamIds(): Observable<TeamId[]> {
    return this.httpClient.get<TeamId[]>(new URL('/teams', this.resourceUrl).toString());
  }

  // Request team members by id from backend
  getTeamById(id: number): Observable<Member[]> {
    return this.httpClient.get<Member[]>(new URL(`/teams?id=${id}`, this.resourceUrl).toString());
  }

  //save(team: Member[])
  //deleteById(id: number)
  //removeMember(teamId, memberId)
  //addMember(teamId, memberId)
}
