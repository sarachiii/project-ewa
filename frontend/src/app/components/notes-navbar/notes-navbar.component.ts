import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Specialty} from "../../models/specialty";

/**
 * This is the notes navbar component that contains navbar items for different specialties,
 * so you can view the notes for your own specialty
 *
 * @author Sarah Chrzanowska-Buth
 */

@Component({
  selector: 'app-notes-navbar',
  templateUrl: './notes-navbar.component.html',
  styleUrls: ['./notes-navbar.component.css']
})
export class NotesNavbarComponent implements OnInit {

  selectedSpecialty: string = <Specialty>{};
  private _specialties: Specialty[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this._specialties = Object.values(Specialty);
  }

  ngOnInit(): void {
    this.selectedSpecialty = this.activatedRoute.snapshot.params['specialty'];
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.selectedSpecialty = params['specialty'];
        }
      );

    this.activatedRoute
      .firstChild?.params
      .subscribe((params: Params) => {
        this.selectedSpecialty =
          this.specialties.find(specialty => specialty == params.specialty)
      });
  }

  onSelect(specialty: string): void {
    if (specialty != null && specialty != this.selectedSpecialty){
      this.router.navigate([specialty], {relativeTo: this.activatedRoute})
        .catch(reason => console.error(reason));
    }

    this.selectedSpecialty = specialty;
  }

  get specialties(): string[] {
    return this._specialties.map(item => item.toLowerCase());
  }
}
