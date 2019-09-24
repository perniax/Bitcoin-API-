import Binance from "binance-api-node";

const client = Binance();

// Authenticated client, can make signed calls
const client2 = Binance({
    apiKey: "",
    apiSecret: ""
    // getTime: xxx // time generator function, optional, defaults to () => Date.now()
});

client.time().then(time => console.log(time));
