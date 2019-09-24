const binance = require("node-binance-api")().options({
    APIKEY: "hWrLPXLjV4e36EhxjYN9ooqEWIRpzBzthDeBFWEsOf4gkEoutAq3tG1K5kHi24r1",
    APISECRET:
        "3wPTX2RyLgpEWpSzTsypmQO11uWGfw1SofIz7atUfLT3N7vqiKAa9FtngYs7bDVw",
    useServerTime: true // If you get timestamp errors, synchronize to server time at startup
});

// Getting latest price of all symbols
binance.prices((error, ticker) => {
    console.log("prices()", ticker);
    console.log("Price of BTC: ", ticker.BTCUSDT);
});

// Getting bid/ask prices for all symbols
binance.bookTickers((error, ticker) => {
    console.log("bookTickers()", ticker);
    console.log("Price of BNB: ", ticker.BNBBTC);
});

// Get 24hr ticker price change statistics for all symbols
binance.prevDay(false, (error, prevDay) => {
    // console.log(prevDay); // view all data
    for (let obj of prevDay) {
        let symbol = obj.symbol;
        console.log(
            symbol +
                " volume:" +
                obj.volume +
                " change: " +
                obj.priceChangePercent +
                "%"
        );
    }
});

// Get 24hr ticker price change statistics for a symbol
binance.prevDay("BNBBTC", (error, prevDay, symbol) => {
    console.log(symbol + " previous day:", prevDay);
    console.log(
        "BNB change since yesterday: " + prevDay.priceChangePercent + "%"
    );
});

// Get Kline/candlestick data for a symbol
// Intervals: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
binance.candlesticks(
    "BNBBTC",
    "5m",
    (error, ticks, symbol) => {
        console.log("candlesticks()", ticks);
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
        console.log(symbol + " last close: " + close);
    },
    { limit: 500, endTime: 1514764800000 }
);
