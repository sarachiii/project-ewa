export enum LanguageCode {
  en_GB = "en_GB",
  nl_NL = "nl_NL"
}

export class Preferences {
  userId: number;
  language: LanguageCode;
  colorblindness: boolean;
  darkMode: boolean;
  private static readonly _langCodes = Object.values(LanguageCode);

  constructor(userId?: number, language?: LanguageCode, colorblindness?: boolean, darkMode?: boolean) {
    this.userId = userId || 0;
    this.language = language || LanguageCode.en_GB;
    this.colorblindness = colorblindness || false;
    this.darkMode = darkMode || false;
  }

  static get langCodes() {
    return Preferences._langCodes;
  }
}
