import { Plugin } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const clean: Plugin = new CleanWebpackPlugin();

export const basePlugins: Plugin[] = [clean];
