import {RankedTypeEnum} from "../../model/enum/ranked-type-enum";
import {SuperstarsTypeEnum} from "../../model/enum/superstars-type-enum";
import {DateSearchRangeEnum} from "../../model/enum/date-search-range-enum"

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

  static getUnixTimeStampFromDateSearchRange(dateSearchRange: DateSearchRangeEnum): string {
    let today = new Date();
    switch (dateSearchRange) {
      case DateSearchRangeEnum.ALL_TO_DATE:
        today = new Date(2020, 0, 1);         //January 1st, 2020 A good start date
        break;
      case DateSearchRangeEnum.LAST_7_DAYS:
        today.setDate(today.getDate()-7);
        break;
      case DateSearchRangeEnum.LAST_15_DAYS:
        today.setDate(today.getDate()-15);
        break;
      case DateSearchRangeEnum.LAST_30_DAYS:
        today.setDate(today.getDate()-30);
        break;
    }
    return Math.floor(today.getTime() / 1000).toFixed(0);
  }
}
