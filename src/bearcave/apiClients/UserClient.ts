import BaseApiClient from "./BaseApiClient";

export default class UserClient extends BaseApiClient {
    async getUserAsync() {
        const url = this.resourceCollections.user.user();
        return await this.httpClient.getAsync<User>(url);
    }
}
type User = any;
/* interface User {
    "userName": string,
    "stidUserName": string,
    "affiliateUserName": string,
    "fullName": string,
    "email": string,
    "statoilEmail": string,
    "country": string,
    "region": string,
    "area": string,
    "title": string,
    "departmentName": string,
    "companyName": string,
    "sponsorUserName": string,
    "sponsorFullName": string,
    "sponsorEmail": string,
    "affiliateValidTo": "2019-11-14T12:50:37.501Z",
    "isStatoilEmployee": true,
    "isSystemAdmin": true,
    "isLciAdmin": true,
    "isApprover": true,
    "isAffiliateUser": true,
    "userAccess": [
      {
        "userName": string,
        "roleName": string,
        "instCode": string,
        "dbName": string,
        "isProd": true,
        "isFileReadRoleStrict": true
      }
    ],
    "recentPlants": [
      {
        "description": string,
        "plantNo": string,
        "prodDbName": string,
        "testDbName": string,
        "businessAreaName": string,
        "isProd": true,
        "isSubsea": true,
        "isOnshore": true,
        "isGreenfield": true,
        "hasMainSystem": true,
        "hasPlantId": true,
        "isFileReadRoleActive": true,
        "isFileReadRoleStrict": true,
        "isDocClassActive": true,
        "isOnlyProd": true,
        "docNoPattern": string,
        "tagNoPattern": string,
        "loopServerName": string,
        "dbCopyDate": "2019-11-14T12:50:37.501Z",
        "links": [
          {
            "title": string,
            "description": string,
            "url": string,
            "doOpenInNewTab": true,
            "sortSequence": 0,
            "isDocSearch": true,
            "isTagSearch": true,
            "isExternal": true,
            "type": string,
            "isVisible": true,
            "filter": {
              "value": {},
              "text": string
            },
            "instCode": string,
            "insertedDate": "2019-11-14T12:50:37.501Z",
            "insertedBy": string,
            "updatedDate": "2019-11-14T12:50:37.501Z",
            "updatedBy": string
          }
        ],
        "standardTagSearches": [
          {
            "instCode": string,
            "tagNo": string,
            "title": string,
            "description": string,
            "tagDescription": string,
            "text": string,
            "skip": 0,
            "take": 0,
            "tagStatuses": [
              string
            ],
            "tagCategory": 0,
            "tagType": string,
            "systemNo": string,
            "subSystem": string,
            "mainSystem": string,
            "locationCode": string,
            "disciplineCode": string,
            "contrCode": string,
            "projectCode": string,
            "poNo": string,
            "plantId": string,
            "updatedSince": "2019-11-14T12:50:37.501Z",
            "updatedTo": "2019-11-14T12:50:37.501Z",
            "sortByTagNo": true,
            "exactSearch": true,
            "editTagNo": string,
            "editDocNo": string,
            "applicationName": string,
            "origin": string,
            "referer": string
          }
        ],
        "standardDocSearches": [
          {
            "instCode": string,
            "docNo": string,
            "docTitle": string,
            "title": string,
            "description": string,
            "text": string,
            "skip": 0,
            "take": 0,
            "revStatuses": [
              string
            ],
            "docCategory": string,
            "docGroup": string,
            "docType": string,
            "systemNo": string,
            "projectCode": string,
            "poNo": string,
            "locationCode": string,
            "disciplineCode": string,
            "contrCode": string,
            "supplDocNo": string,
            "fileDescription": string,
            "updatedSince": "2019-11-14T12:50:37.501Z",
            "updatedTo": "2019-11-14T12:50:37.501Z",
            "markup": string,
            "sortByDocNo": true,
            "exactSearch": true,
            "editTagNo": string,
            "editDocNo": string,
            "applicationName": string,
            "origin": string,
            "referer": string
          }
        ],
        "contacts": [
          {
            "id": 0,
            "instCode": string,
            "userName": string,
            "fullName": string,
            "email": string,
            "description": string,
            "isVisible": true,
            "thumbnailPhoto": string,
            "profileUrl": string
          }
        ],
        "plantConnections": [
          {
            "instCodeFrom": string,
            "instCodeTo": string
          }
        ],
        "imageFileName": string,
        "userName": string,
        "createDoc": true,
        "createTag": true,
        "editDoc": true,
        "editEle": true,
        "editRevision": true,
        "editTag": true,
        "importFile": true,
        "importMarkupFile": true,
        "readMetadata": true,
        "readFile": true,
        "filter": {
          "value": {},
          "text": string
        },
        "instCode": string,
        "insertedDate": "2019-11-14T12:50:37.501Z",
        "insertedBy": string,
        "updatedDate": "2019-11-14T12:50:37.501Z",
        "updatedBy": string
      }
    ],
    "plantAccess": [
      {
        "instCode": string,
        "createDoc": true,
        "createTag": true,
        "editDoc": true,
        "editEle": true,
        "editRevision": true,
        "editTag": true,
        "importFile": true,
        "importMarkupFile": true,
        "readMetadata": true,
        "readFile": true
      }
    ],
    "preferTableView": true,
    "defaultPlant": string,
    "defaultTagStatus": string,
    "defaultRevStatus": string
  };
 */
