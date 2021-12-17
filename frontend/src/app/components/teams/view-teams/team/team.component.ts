import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Role, User} from "../../../../models/user";

class Member {
  id: number;
  teamId: number;
  firstName: string;
  lastName: string;
  email: string;
  specialty: string;
  constructor(id: number, teamId: number, firstName: string, lastName: string, email: string, specialty: string) {
    this.id = id;
    this.teamId = teamId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.specialty = specialty;
  }
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, OnChanges {
  readonly Role = Role;
  @Input()
  selectedTeamId: number;
  members: Member[];
  team: Member[];
  @Input()
  user: User;
  editTeam: boolean;

  constructor() {
    this.team = [];
    this.members = [
      new Member(1, 1, "Sjors", "Peters", "sjors.peters@climatecleanup.org", "Botany"),
      new Member(2, 1, "Geert", "van Beek", "G.v.Beek@ccu.org", "Geology"),
      new Member(3, 1, "Janet", "van Koningsbrugge", "J.v.Koningsbrugge@ccu.org", "Climate-Science" ),
      new Member(4, 1, "Amaya", "Antonia", "A.Antonia@ccu.org", "Hydrology"),
      new Member(5, 1, "Mercedes", "Ericsson", "M.Ericsson@ccu.org", "Agronomy"),

      new Member(6, 2, "Olivier", "Womack", "O.Womack@ccu.org", "Geology"),
      new Member(7, 2, "Fatima", "Qadir", "F.Qadir@ccu.org", "Botany"),
      new Member(8, 2, "Nida", "Aslan", "N.Aslan@ccu.org", "Agronomy"),
      new Member(9, 2, "Bret", "Castillo", "B.Castillo@ccu.org", "Hydrology"),
      new Member(10, 2, "Floyd", "Hedwig", "F.Hedwig@ccu.org", "Climate-Science"),

      new Member(11, 3, "Raymond", "Achilles", "R.Achilles@ccu.org", "Agronomy"),
      new Member(12, 3, "Lukas", "Sumner", "L.Sumner@ccu.org", "Botany"),
      new Member(13, 3, "Heng", "Yu", "H.Yu@ccu.org", "Geology"),
      new Member(14, 3, "Haris", "Porter", "H.Porter@ccu.org", "Climate-Science"),
      new Member(15, 3, "Isla", "Best", "I.Best@ccu.org", "Hydrology"),

      new Member(16, 4, "Deborah", "Taylor", "D.Taylor@ccu.org", "Hydrology"),
      new Member(17, 4, "Katrina", "Hoover", "K.Hoover@ccu.org", "Botany"),
      new Member(18, 4, "Verena", "Hoch", "V.Hoch@ccu.org", "Agronomy"),
      new Member(19, 4, "Nao", "David", "N.David@ccu.org", "Geology"),
      new Member(20, 4, "Keiko", "Backus", "K.Backus@ccu.org", "Climate-Science"),

      new Member(21, 5, "Paul", "Sato", "P.Sato@ccu.org", "Climate-Science"),
      new Member(22, 5, "Onur", "Hoffman", "O.Hoffman@ccu.org", "Hydrology"),
      new Member(23, 5, "Kennith", "Glass", "K.Glass@ccu.org", "Botany"),
      new Member(24, 5, "Paula", "Banister", "P.Banister@ccu.org", "Agronomy"),
      new Member(25, 5, "Hideaki", "Chen", "H.Chen@ccu.org", "Geology")
    ]
    this.editTeam = false;
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges) {
    this.team = this.members.filter((member) => member.teamId == this.selectedTeamId);
    this.editTeam = false;
  }

}
