import { Configuration } from "webpack-dev-server";
import path from "path";

const rootPath = path.resolve(__dirname, "../../");

const devServerOptions: Configuration = {
    port: 1337,
    hot: true,
    historyApiFallback: {
        index: "build/",
    },
};

export { devServerOptions };
