export enum EField {
  AGRONOMY = "Agronomy",
  BOTANY = "Botany",
  GEOLOGY = "Geology",
  HYDROLOGY = "Hydrology",
  CLIMATE_SCIENCE = "Climate-Science",
  UNKNOWN = ""
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

