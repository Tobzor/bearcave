const separator = "/";
export const trimTrailingSlash = (url: string) => url.replace(/\/$/, "");
export const combineUrls = (base: string, ...parts: string[]) => {
    const url = (parts || [])
        .filter(part => part)
        .reduce(
            (url, part) =>
                url +
                separator +
                part
                    .toString()
                    .replace(/^\/+/, "")
                    .replace(/\/+$/, "")
                    .replace(/\/\//gm, separator),
            base || "",
        );

    return trimTrailingSlash(url);
};

export type Params = { [key: string]: any };
export const addParams = (url: string, params: Params): string => {
    const queryString = Object.keys(params)
        .filter(key => params[key])
        .reduce((query, key) => query + `${query ? "&" : ""}${key}=${encodeURIComponent(params[key])}`, "");
    return url + "?" + queryString;
};
