import HtmlWebpackPlugin from "html-webpack-plugin";
import { Plugin } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import UglyfyjsPlugin from "uglifyjs-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import imageminMozjpeg from "imagemin-mozjpeg";
import ImageminPlugin from "imagemin-webpack-plugin";

/** Handles the templating of index.html */
const htmlWebPackPlugin: HtmlWebpackPlugin = new HtmlWebpackPlugin({
    template: "./public/index.html",
    filename: "./index.html",
});

// Will clear the build folder between prod builds.
const cleanProd = new CleanWebpackPlugin({ verbose: true });

// Copies plant images to build folder. Everything in ./resources/images is copied to ./buid/resources/images.
const copyImages = new CopyWebpackPlugin([{ from: "./resources/images/", to: "./resources/images/" }]);

// Minify prod code
const uglify = new UglyfyjsPlugin({
    include: /\/build/,
});

const bundleAnalyzer = new BundleAnalyzerPlugin();

// Compress images, for use in prod.
const jpegEncoder = ([imageminMozjpeg({ quality: 50 })] as unknown) as Promise<Buffer>[];
const compressImages = new ImageminPlugin({
    test: /\.(jpg|jpeg)$/,
    plugins: jpegEncoder,
});

// Export all plugins which are used in all environments.
export const basePlugins: Plugin[] = [htmlWebPackPlugin];

/**
 * Export individual plugins.
 */
export { htmlWebPackPlugin };
export { cleanProd };
export { copyImages };
export { uglify };
export { bundleAnalyzer };
export { compressImages };
