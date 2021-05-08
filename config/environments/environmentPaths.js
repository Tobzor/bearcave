import { join } from "../webpack/root";

const basePath = join(__dirname + "/.env");
const devEnv = basePath + ".development";
const testEnv = basePath + ".test";

const EnvPaths = {
    prod: basePath,
    dev: devEnv,
    test: testEnv,
};

export default EnvPaths;
