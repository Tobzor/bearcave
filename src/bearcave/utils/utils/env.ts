

export function isDev() {
    const env = import.meta.env;
    return Boolean(env.MODE === "development");
}
