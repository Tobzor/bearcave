const glob = require("glob");
const { rootPath, join } = require("./root");

function defineEntry() {
    return {
        main: [
            join(rootPath, "/src/index.tsx"),
            ...glob.sync(join(rootPath, "/src/apps/**/index.tsx")),
        ],
    };
}

module.exports = defineEntry;
