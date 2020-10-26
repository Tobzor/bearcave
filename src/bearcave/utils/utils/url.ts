const separator = "/";

export function trimTrailingSlash(url: string): string {
    return url.replace(/\/$/, "");
}

export function sanitizedUrl(url: string): string {
    return trimTrailingSlash(url.replace(/(?<=[^:\s])(\/+\/)/g, separator));
}

export function combineUrls(base: string, ...parts: string[]): string {
    return sanitizedUrl(
        [base]
            .concat(parts)
            .filter((a) => !!a)
            .join(separator),
    );
}
