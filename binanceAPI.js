const { APIKEY, APISECRET } = require("./secrets.json");

const binance = require("node-binance-api")().options({
    APIKEY,
    APISECRET,
    useServerTime: true // If you get timestamp errors, synchronize to server time at startup
});

module.exports.prices = function() {
    // Getting latest price of all symbols
    binance.prices((error, ticker) => {
        console.log("prices()", ticker);
        // console.log("Price of BTC: ", ticker.BTCUSDT);
        return ticker;
    });
};

module.exports.bookTickers = function() {
    // Getting bid/ask prices for all symbols
    binance.bookTickers((error, ticker) => {
        // console.log("bookTickers()", ticker);
        // console.log("Price of BNB: ", ticker.BNBBTC);
        return ticker;
    });
};

module.exports.prevDay = function() {
    // Get 24hr ticker price change statistics for all symbols
    binance.prevDay(false, (error, prevDay) => {
        // console.log(prevDay); // view all data
        for (let obj of prevDay) {
            let symbol = obj.symbol;
            // console.log(
            //     symbol +
            //         " volume:" +
            //         obj.volume +
            //         " change: " +
            //         obj.priceChangePercent +
            //         "%"
            // );
        }
        return prevDay;
    });
};

module.exports.prevDayStatsSymbols = function() {
    // Get 24hr ticker price change statistics for a symbol
    binance.prevDay("BNBBTC", (error, prevDay, symbol) => {
        // console.log(symbol + " previous day:", prevDay);
        console.log(
            "BNB change since yesterday: " + prevDay.priceChangePercent + "%"
        );
        return prevDay, symbol;
    });
};

module.exports.candlesticks = function() {
    // Get Kline/candlestick data for a symbol
    // Intervals: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
    binance.candlesticks(
        "BNBBTC",
        "5m",
        (error, ticks, symbol) => {
            // console.log("candlesticks()", ticks);
            return ticks;
            let last_tick = ticks[ticks.length - 1];
            let [
                time,
                open,
                high,
                low,
                close,
                volume,
                closeTime,
                assetVolume,
                trades,
                buyBaseVolume,
                buyAssetVolume,
                ignored
            ] = last_tick;
            // console.log(symbol + " last close: " + close);
        },

        { limit: 500, endTime: 1514764800000 }
    );
};
