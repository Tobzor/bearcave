// locals
import { rootPath, appsPath } from "../root";
import { defineEntry } from "../entry";
import { defineModule } from "../rules";
import { defineResolve } from "../resolve";
import { definePlugins } from "../plugins";
import { defineOptimization } from "../optimization";
import { defineOutput } from "../output";

/**
 * @type {ENV} env
 */
const env = "prod";

const config = {
    mode: "production",
    entry: defineEntry(rootPath, appsPath),
    module: defineModule(env),
    resolve: defineResolve(rootPath),
    plugins: definePlugins(env),
    optimization: defineOptimization(env),
    output: defineOutput(rootPath),
};

export default config;
