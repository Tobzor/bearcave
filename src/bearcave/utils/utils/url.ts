const separator = "/";

export function trimTrailingSlash(url: string): string {
    return url.replace(/\/$/, "");
}

export function sanitizedUrl(url: string): string {
    // something about lookahead regex that breaks in safari.
    // return trimTrailingSlash(url.replace(/(?<=[^:\s])(\/+\/)/g, separator));
    return trimTrailingSlash(url);
}

export function combineUrls(base: string, ...parts: string[]): string {
    return sanitizedUrl(
        [base]
            .concat(parts)
            .filter((part) => !!part)
            .map((part) => encodeURIComponent(part))
            .join(separator),
    );
}
