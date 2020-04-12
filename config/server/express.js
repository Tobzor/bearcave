const helmet = require("helmet");
const express = require("express");
const path = require("path");

const app = express();

// Serverside it equals /home/site/wwwroot/www/
const publicRoot = path.join(__dirname, "www");

// Map indivdual helmet features and inject them to express.
const helmetFeatures = initHelmet();
helmetFeatures.map(feature => {
    app.use(feature);
});
app.use(express.static(publicRoot));

// Redirect 404's to index.
app.get("*", (req, res) => {
    res.sendFile(path.join(publicRoot + "/index.html"), 404);
});

app.get("/logout", (req, res) => {
    res.sendFile(path.join(publicRoot + "/logout.html"));
});

// All other routing
app.get("/", (req, res) => {
    res.sendFile(path.join(publicRoot + "/index.html"));
});

// Port definitions. Like in webpack-dev-server, we use 3000 locally.
const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
    console.info(app);
});

/**
 * Define a list of helmet features we want to use.
 */
function initHelmet() {
    const helmetFeatures = [];

    helmetFeatures.push(helmet.dnsPrefetchControl());
    helmetFeatures.push(helmet.frameguard({ action: "sameorigin" }));
    helmetFeatures.push(helmet.hidePoweredBy());
    helmetFeatures.push(
        helmet.hsts({
            // 60 days
            maxAge: 5184000,
        }),
    );
    helmetFeatures.push(helmet.ieNoOpen());
    helmetFeatures.push(helmet.noSniff());
    helmetFeatures.push(helmet.xssFilter());
    return helmetFeatures;
}
