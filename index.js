const express = require("express");
const hb = require("express-handlebars");
// const fs = require("fs");
const db = require("./utils/db");
// const support = require("./supporters");
let cookieSession = require("cookie-session");
const bc = require("./utils/bc");
let { hash, compare } = require("./utils/bc");
const csurf = require("csurf");
const app = express();

// const binanceAPI = require("binance-api-node");

app.use(
    cookieSession({
        secret: `Hakuna_Matata`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.locals.helpers = {};

app.engine("handlebars", hb());
app.set("view engine", "handlebars");

app.use(express.static("./public"));

app.use(
    express.urlencoded({
        extended: false
    })
);

app.use(csurf());

app.use(function(req, res, next) {
    res.setHeader("x-frame-options", "deny");
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    // console.log("The route is: ", req.url);
    next();
});

//******* END OF BOILERPLATE *********

app.get("/", (req, res) => {
    res.redirect("/quotes");
});

app.get("/quotes", (req, res) => {
    res.render("quotes", {
        name: "quotes",
        layout: "main"
    });
});

/////////////////////////////////

///////////////////////////////

//*****API request****

app.listen(process.env.PORT || 8080, () => {
    console.log("My express server is running");
});
