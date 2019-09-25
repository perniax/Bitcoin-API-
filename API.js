var burl = "https://api.binance.com";

var query = "/api/v1/klines";

query += "symbol+BTCUSD&interval=15&limit2";

var url = burl + query;

var ourRequest = new XMLHttpRequest();

ourRequest.open("GET", url, true);
ourRequest.onload = function() {
    console.log(ourRequest.responseText);
};
ourRequest.send();
