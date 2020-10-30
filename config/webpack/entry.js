const glob = require("glob");
const { rootPath, join, parse } = require("./root");

function defineEntry() {
    return {
        main: join(rootPath, "/src/index.tsx"),
        ...glob
            .sync(join(rootPath, "/src/apps/**/index.tsx"))
            .reduce(function (acc, app) {
                const appName = parse(app).dir.split("/").pop();
                acc["apps/" + appName] = app;

                return acc;
            }, {}),
    };
}

module.exports = defineEntry;
