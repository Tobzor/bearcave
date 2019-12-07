import JSON from "../utils/JSON";

const b64DecodeUnicode = (str: string): string =>
    decodeURIComponent(
        Array.prototype.map.call(atob(str), (c: any) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""),
    );

export class StidAuthTokenParseError extends Error {
    constructor(token: string) {
        super(`Unable to parse token [${token}]`);
    }
}

export default class AuthToken {
    static parse(token: string): AuthToken {
        const [, userPart] = token.split(".");
        const parsedToken = JSON.parse<ParsedBearerToken>(b64DecodeUnicode(userPart));

        if (!parsedToken) {
            throw new StidAuthTokenParseError(token);
        }

        return new AuthToken(token, parsedToken);
    }

    private constructor(originalToken: string, parsedToken: ParsedBearerToken) {
        this._originalToken = originalToken;
        this._parsedToken = parsedToken;
    }

    private _parsedToken: ParsedBearerToken;
    private _originalToken: string;

    get id(): string {
        return this._parsedToken.oid;
    }

    get fullName(): string {
        return this._parsedToken.name;
    }

    get givenName(): string {
        return this._parsedToken.given_name;
    }

    get familyName(): string {
        return this._parsedToken.family_name;
    }

    get originalToken(): string {
        return this._originalToken;
    }

    get nonce(): string {
        return this._parsedToken.nonce;
    }

    get expiration(): number {
        return this._parsedToken.exp;
    }

    get roles(): string[] {
        return this._parsedToken.roles;
    }

    get upn(): string {
        return this._parsedToken.upn;
    }

    toString() {
        return this._originalToken;
    }

    isValid(): boolean {
        const now = Math.floor(new Date().getTime() / 1000);

        if (now >= this.expiration) {
            return false;
        }

        return true;
    }
}

type ParsedBearerToken = {
    acr: string;
    aio: string;
    amr: string[];
    appid: string;
    appidacr: string;
    aud: string; // TODO: Validate
    nonce: string;
    exp: number;
    family_name: string;
    given_name: string;
    iat: number;
    ipaddr: number;
    iss: string;
    name: string;
    nbf: number;
    oid: string;
    onprem_sid: string;
    roles: string[];
    scp: string;
    sub: string;
    tid: string;
    unique_name: string;
    upn: string;
    uti: string;
    ver: string;
};
