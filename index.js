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
//*******0
app.get("/bitcoin", (req, res) => {
    binance.prevDay("BTCUSDT", (error, prevDay, symbol) => {
        console.log(symbol + " previous day:", prevDay);
        // console.log(
        //     "BNB change since yesterday: " + prevDay.priceChangePercent + "%"
        // );
        console.log("prevDay: ", prevDay);
        res.render("history", {
            name: "bitcoin",
            prevDay: prevDay,
            layout: "main"
        });
    });
});

//*****1

app.get("/ripple", (req, res) => {
    binance.prevDay("XRPUSDT", (error, prevDay, symbol) => {
        console.log(symbol + " previous day:", prevDay);
        // console.log(
        //     "BNB change since yesterday: " + prevDay.priceChangePercent + "%"
        // );
        console.log("prevDay: ", prevDay);
        res.render("history", {
            name: "ripple",
            prevDay: prevDay,
            layout: "main"
        });
    });
});

//*****2

app.get("/litecoin", (req, res) => {
    binance.prevDay("LTCUSDT", (error, prevDay, symbol) => {
        console.log(symbol + " previous day:", prevDay);
        // console.log(
        //     "BNB change since yesterday: " + prevDay.priceChangePercent + "%"
        // );
        console.log("prevDay: ", prevDay);
        res.render("history", {
            name: "litecoin",
            prevDay: prevDay,
            layout: "main"
        });
    });
});

//*****3

app.get("/ethereum", (req, res) => {
    binance.prevDay("ETHUSDT", (error, prevDay, symbol) => {
        console.log(symbol + " previous day:", prevDay);
        // console.log(
        //     "BNB change since yesterday: " + prevDay.priceChangePercent + "%"
        // );
        console.log("prevDay: ", prevDay);
        res.render("history", {
            name: "ethereum",
            prevDay: prevDay,
            layout: "main"
        });
    });
});

//*****4

app.get("/neo", (req, res) => {
    binance.prevDay("NEOUSDT", (error, prevDay, symbol) => {
        console.log(symbol + " previous day:", prevDay);
        // console.log(
        //     "BNB change since yesterday: " + prevDay.priceChangePercent + "%"
        // );
        console.log("prevDay: ", prevDay);
        res.render("history", {
            name: "neo",
            prevDay: prevDay,
            layout: "main"
        });
    });
});

//*****5

app.get("/monero", (req, res) => {
    binance.prevDay("XMRUSDT", (error, prevDay, symbol) => {
        console.log(symbol + " previous day:", prevDay);
        // console.log(
        //     "BNB change since yesterday: " + prevDay.priceChangePercent + "%"
        // );
        console.log("prevDay: ", prevDay);
        res.render("history", {
            name: "monero",
            prevDay: prevDay,
            layout: "main"
        });
    });
});

//*****6

app.get("/iota", (req, res) => {
    binance.prevDay("IOTAUSDT", (error, prevDay, symbol) => {
        console.log(symbol + " previous day:", prevDay);
        // console.log(
        //     "BNB change since yesterday: " + prevDay.priceChangePercent + "%"
        // );
        console.log("prevDay: ", prevDay);
        res.render("history", {
            name: "iota",
            prevDay: prevDay,
            layout: "main"
        });
    });
});

//*****7

app.get("/dash", (req, res) => {
    binance.prevDay("DASHUSDT", (error, prevDay, symbol) => {
        console.log(symbol + " previous day:", prevDay);
        // console.log(
        //     "BNB change since yesterday: " + prevDay.priceChangePercent + "%"
        // );
        console.log("prevDay: ", prevDay);
        res.render("history", {
            name: "dash",
            prevDay: prevDay,
            layout: "main"
        });
    });
});

//*****8

app.get("/cardano", (req, res) => {
    binance.prevDay("ADAUSDT", (error, prevDay, symbol) => {
        console.log(symbol + " previous day:", prevDay);
        // console.log(
        //     "BNB change since yesterday: " + prevDay.priceChangePercent + "%"
        // );
        console.log("prevDay: ", prevDay);
        res.render("history", {
            name: "cardano",
            prevDay: prevDay,
            layout: "main"
        });
    });
});

//***WEBSOCKETS***

// import Binance from "binance-api-node";
//
// const client = Binance();
//
// app.get("/live", (req, res) => {
//     client.ws.partialDepth({ symbol: "ETHBTC", level: 10 }, depth => {
//         console.log(depth);
//         res.render("live", {
//             name: "live",
//             depth: depth,
//             layout: "main"
//         });
//     });
// });

//*****API request****

app.listen(process.env.PORT || 8080, () => {
    console.log("My express server is running");
});
