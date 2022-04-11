import { rootPath, join } from "../webpack/root";

const basePath = join(rootPath, "/config/environments/");
const devEnv = basePath + "development.env";
const testEnv = basePath + "test.env";

const EnvPaths = {
    prod: basePath + ".env",
    dev: devEnv,
    test: testEnv,
};

export default EnvPaths;
