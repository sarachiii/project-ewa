export class Team {
  private _id: number;
  private _ghId: number;

  constructor(id: number, ghId: number) {
    this._id = id;
    this._ghId = ghId;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get ghId(): number {
    return this._ghId;
  }

  set ghId(value: number) {
    this._ghId = value;
  }
}
