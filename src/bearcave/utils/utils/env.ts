export function isDev() {
    return Boolean(process.env.ENV === "dev");
}
