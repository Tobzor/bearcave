import { Configuration } from "webpack-dev-server";
import path from "path";

const rootPath = path.resolve(__dirname, "../../");

const devServerOptions: Configuration = {
    port: 1337,
    hot: true,
    contentBase: path.join(rootPath, "public/"),
    publicPath: "http://localhost:1337/dist/",
    // historyApiFallback: {
    //     index: "/",
    // },
};

export { devServerOptions };
