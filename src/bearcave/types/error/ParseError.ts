export class ParseError extends Error {
    parseError: any;
    attemptedParse: any;
    constructor(attemptedValue?: any, error?: any) {
        super("Could not parse the provided value");
        this.parseError = error;
        this.attemptedParse = attemptedValue;
    }
}
