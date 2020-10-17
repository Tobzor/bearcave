import { ParseError } from "@types";

function parse<T>(stringified: string): T {
    try {
        const parsed = JSON.parse(stringified);
        return parsed as T;
    } catch (error) {
        throw new ParseError(stringified, error);
    }
}

function stringify<T>(parsed: T): string {
    try {
        const stringified = JSON.stringify(parsed);
        return stringified;
    } catch (error) {
        throw new ParseError(parsed, error);
    }
}

export default { parse, stringify };
