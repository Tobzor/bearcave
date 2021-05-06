/**
 * @typedef {"prod" | "test" | "dev" | "analyze"} ENV
 */

/**
 * @typedef WebpackConfig
 * @type {object}
 * @property {WebpackEntry} entry
 * @property {WebpackDevtool} devtool
 * @property {WebpackModule} module
 * @property {WebpackPlugin[]} plugins
 * @property {WebpackResolve} resolve
 * @property {WebpackOptimization} optimization
 * @property {WebpackOutput} output
 */

/**
 * @typedef WebpackEntry
 * @type {object}
 */

/**
 * @typedef WebpackDevtool
 * @type {object|string}
 */

/**
 * @typedef WebpackModule
 * @type {object}
 * @property {Array<RuleSetRule>} rules
 */

/**
 * @typedef RuleSetRule
 * @type {object}
 * @property {RegExp} test
 * @property {Array<string|RegExp>} include
 * @property {Array<string|RegExp>} exclude
 * @property {Array<string|UseLoaderRule>} use
 */

/**
 * @typedef UseLoaderRule
 * @type {object}
 * @property {string} loader
 * @property {object} options
 */

/**
 * @typedef WebpackPlugin
 * @type {object}
 */

/**
 * @typedef WebpackResolve
 * @type {object}
 * @property {Array<string>} extensions
 * @property {object} alias
 */

/**
 * @typedef WebpackOptimization
 * @type {object}
 * @property {string} runtimeChunk
 * @property {object} splitChunks
 * @property {boolean} minimize
 * @property {Array<string|object>} minimizer
 */

/**
 * @typedef WebpackOutput
 * @type {object}
 */

/**
 * @typedef WebpackDevServer
 * @type {object}
 * @property {number} port
 * @property {boolean} hot
 * @property {WebpackDevServerHistoryApiFallback} historyApiFallback
 * @property {string} stats
 * @property {boolean} noInfo
 */

/**
 * @typedef WebpackDevServerHistoryApiFallback
 * @type {object}
 * @property {boolean} disableDotRule
 * @property {string} index
 */
