import { resolve, join, parse } from "path";

// The absolute path to the root of project.
const rootPath = resolve(__dirname, "../../");
const appsPath = join(rootPath, "/src/apps/**/index.tsx");

export { rootPath, appsPath, join, parse };
