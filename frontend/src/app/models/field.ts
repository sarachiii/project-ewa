export enum EField {
  A = "Agronomy",
  B = "Botany",
  G = "Geology",
  H = "Hydrology",
  CS = "Climate-Science"
}

export class Field  {
  private _name: string;

  constructor(name: string = "") {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
}
