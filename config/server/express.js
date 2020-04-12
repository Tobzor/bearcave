import { dnsPrefetchControl, frameguard, hidePoweredBy, hsts, ieNoOpen, noSniff, xssFilter } from "helmet";
import express, { static } from "express";
import { join } from "path";

const app = express();
// Serverside it equals /home/site/wwwroot/www/
const publicRoot = join(__dirname, "www");

/**
 * Define a list of helmet features we want to use.
 */
function initHelmet() {
    const helmetFeatures = [];

    helmetFeatures.push(dnsPrefetchControl());
    helmetFeatures.push(frameguard({ action: "sameorigin" }));
    helmetFeatures.push(hidePoweredBy());
    helmetFeatures.push(
        hsts({
            // 60 days
            maxAge: 5184000,
        }),
    );
    helmetFeatures.push(ieNoOpen());
    helmetFeatures.push(noSniff());
    helmetFeatures.push(xssFilter());
    return helmetFeatures;
}

// Map indivdual helmet features and inject them to express.
const helmetFeatures = initHelmet();
helmetFeatures.map((feature) => {
    app.use(feature);
});
app.use(static(publicRoot));

// Redirect 404's to index.
app.get("*", (req, res) => {
    res.sendFile(join(publicRoot + "/index.html"), 404);
});

app.get("/logout", (req, res) => {
    res.sendFile(join(publicRoot + "/logout.html"));
});

// All other routing
app.get("/", (req, res) => {
    res.sendFile(join(publicRoot + "/index.html"));
});

// Port definitions. Like in webpack-dev-server, we use 3000 locally.
const port = parseInt(process.env.PORT) || 3000;
app.listen(port, () => {
    console.info(app);
});
