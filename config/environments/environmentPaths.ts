import path from "path";

const basePath = path.join(__dirname + "/.env");
const devEnv = basePath + ".development";
const testEnv = basePath + ".test";

type EnvPathsType = {
    prod: string;
    dev: string;
    test: string;
};

const EnvPaths: Readonly<EnvPathsType> = {
    prod: basePath,
    dev: devEnv,
    test: testEnv,
};

export { EnvPaths };
