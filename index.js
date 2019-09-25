const express = require("express");
const hb = require("express-handlebars");
// const fs = require("fs");
// const db = require("./utils/db");
// const support = require("./supporters");
let cookieSession = require("cookie-session");
// const bc = require("./utils/bc");
// let { hash, compare } = require("./utils/bc");
const csurf = require("csurf");
const app = express();

const { APIKEY, APISECRET } = require("./secrets.json");
//*******
const binance = require("node-binance-api")().options({
    APIKEY,
    APISECRET,
    useServerTime: true // If you get timestamp errors, synchronize to server time at startup
});
//********
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
    console.log("The route is: ", req.url);
    next();
});

//******* END OF BOILERPLATE *********

app.get("/", (req, res) => {
    res.redirect("/welcome");
});

app.get("/welcome", (req, res) => {
    res.render("welcome", {
        name: "welcome",
        layout: "main"
    });
});

// Getting latest price of all symbols
app.get("/prices", (req, res) => {
    binance.prices((error, ticker) => {
        // console.log("prices()", ticker);
        console.log("Price of BTC: ", ticker.BTCUSDT);
        res.render("prices", {
            name: "prices",
            ticker: ticker,
            layout: "main"
        });
    });
});

// Getting bid/ask prices for all symbols
//*** ARRAY WITH PAIRS OF COINS!
app.get("/bidask", (req, res) => {
    binance.bookTickers((error, ticker) => {
        console.log("Bid symbol of the fist coin: ", ticker[0].symbol);
        // console.log("bookTickers()", ticker);
        res.render("bidask", {
            name: "bidask",
            ticker: ticker,
            layout: "main"
        });
    });
});

// Get 24hr ticker price change statistics for all symbols
app.get("/stats", (req, res) => {
    binance.prevDay(false, (error, prevDay) => {
        console.log("**prevDay: ", prevDay); // view all data
        // for (let obj of prevDay) {
        // let symbol = obj.symbol;
        // console.log(
        //     symbol +
        //         " volume:" +
        //         obj.volume +
        //         " change: " +
        //         obj.priceChangePercent +
        //         "%"
        // );
        res.render("stats", {
            name: "stats",
            prevDay: prevDay,
            layout: "main"
        });
        // }
    });
});

// Get 24hr ticker price change statistics for a symbol

app.get("/prevday", (req, res) => {
    binance.prevDay("BNBBTC", (error, prevDay, symbol) => {
        // console.log(symbol + " previous day:", prevDay);
        console.log(
            "BNB change since yesterday: " + prevDay.priceChangePercent + "%"
        );
        console.log("****prevDay: ", prevDay);
        res.render("prevday", {
            name: "prevday",
            symbol: symbol,
            layout: "main"
        });
    });
});
//*****API request****

app.listen(process.env.PORT || 8080, () => {
    console.log("My express server is running");
});
