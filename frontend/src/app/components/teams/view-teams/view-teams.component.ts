import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-view-teams',
  templateUrl: './view-teams.component.html',
  styleUrls: ['./view-teams.component.css', '../teams.component.css']
})
export class ViewTeamsComponent implements OnInit, OnDestroy {
  private _selectedTeamId: number;
  protected paramsSubscription: Subscription | null;
  // Mocking teams ids
  teams = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.paramsSubscription = null;
  }

  get selectedTeamId(): number {
    return this._selectedTeamId;
  }

  set selectedTeamId(value: number) {
    this._selectedTeamId = value;
  }

  ngOnInit(): void {
    this.paramsSubscription =
      this.activatedRoute
        .queryParams
        .subscribe((params) => {
          this.selectedTeamId = params['team'] || -1;
        });
  }

  ngOnDestroy(): void {
    this.paramsSubscription && this.paramsSubscription.unsubscribe();
  }

  onSelect(id: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { team: id }
    }).catch(console.error)
  }

}
