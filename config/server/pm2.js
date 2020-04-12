module.exports = {
    apps: [
        {
            name: "STID Portal Frontend",
            script: "./express.js",
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
