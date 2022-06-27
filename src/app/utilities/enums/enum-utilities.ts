import {RankedTypeEnum} from "../../model/enum/ranked-type-enum";
import {SuperstarsTypeEnum} from "../../model/enum/superstars-type-enum";

export class EnumUtilities {

  static getRankedTypeEnumFromString(rankedTypeString: string): RankedTypeEnum {
    let resultEnum!: RankedTypeEnum;              //Using ! to denote we trust everyone calling this method
    Object.entries(RankedTypeEnum).forEach(
      ([key, value]) => {
        if (value === rankedTypeString) {
          resultEnum = <RankedTypeEnum>key;
        }
      }
    );
    return resultEnum;
  }

  static getSuperstarTypeEnumFromString(superstarsTypeString: string): SuperstarsTypeEnum {
    let resultEnum!: SuperstarsTypeEnum;           //Using ! to denote we trust everyone calling this method
    Object.entries(SuperstarsTypeEnum).forEach(
      ([key, value]) => {
        if (value === superstarsTypeString) {
          resultEnum = <SuperstarsTypeEnum>key;
        }
      }
    );
    return resultEnum;
  }

  //might need a similar method getTagListFromEnums
  static getTagListFromStrings(rankedString: string, superstarString: string): string[] {
    let tags: string[] = [];
    if (rankedString) {
      switch (rankedString) {         //lol apparently switching on the string works because 'case' pulls the value
        case RankedTypeEnum.RANKED:
          tags.push('Ranked');
          break;
        case RankedTypeEnum.UNRANKED:
          tags.push('Unranked');
          break;
      }
    }

    if (superstarString) {
      switch (superstarString) {
        case SuperstarsTypeEnum.SUPERSTARS_OFF:
          tags.push('Normal');
          break;
        case SuperstarsTypeEnum.SUPERSTARS_ON:
          tags.push('Superstar');
          break;
      }
    }
    return tags;
  }
}
